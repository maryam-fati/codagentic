import { Stage, Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const createSphereNodes = (services, radius) => {
  const uniqueTags = [...new Set(services)].slice(0, 20);
  const numNodes = 20;
  const nodes = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  if (uniqueTags.length > 0) {
    nodes.push({
      id: "inner",
      name: uniqueTags[0],
      x: 0,
      y: 0,
      z: 0,
      isInner: true,
    });
  }

  for (let i = 0; i < uniqueTags.length; i++) {
    const phi = 2 * Math.PI * (i / goldenRatio);
    const cosTheta = 1 - (2 * i) / (uniqueTags.length - 1);
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);

    nodes.push({
      id: i,
      name: uniqueTags[i],
      x: radius * sinTheta * Math.cos(phi),
      y: radius * cosTheta,
      z: radius * sinTheta * Math.sin(phi),
    });
  }

  for (let i = uniqueTags.length; i < numNodes; i++) {
    const phi = 2 * Math.PI * (i / goldenRatio);
    const cosTheta = 1 - (2 * i) / (numNodes - 1);
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);

    nodes.push({
      id: i,
      name: "",
      x: radius * sinTheta * Math.cos(phi),
      y: radius * cosTheta,
      z: radius * sinTheta * Math.sin(phi),
    });
  }
  return nodes;
};

const findClosestNodes = (nodes, index) => {
  const currentNode = nodes[index];
  return nodes
    .map((node, i) => ({
      index: i,
      distance: Math.hypot(node.x - currentNode.x, node.y - currentNode.y, node.z - currentNode.z),
    }))
    .filter((n) => n.index !== index)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8)
    .map((n) => [index, n.index]);
};

const applyRotation = (nodes, rotation) => {
  return nodes.map(({ id, name, x, y, z }) => {
    const newX = x * Math.cos(rotation.y) - z * Math.sin(rotation.y);
    const newZ = x * Math.sin(rotation.y) + z * Math.cos(rotation.y);
    const newY = y * Math.cos(rotation.x) - newZ * Math.sin(rotation.x);
    return { id, name, x: newX, y: newY, z: newZ };
  });
};

const Edge = ({ start, end, opacity, centerX, centerY }) => {
  if (!start || !end) return null;
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, "gray", opacity);
        g.moveTo(start.x + centerX, start.y + centerY);
        g.lineTo(end.x + centerX, end.y + centerY);
      }}
    />
  );
};

const Node = ({ node, gsapRefs, colorr, centerX, centerY }) => (
  <Container x={node.x + centerX} y={node.y + centerY} ref={(el) => (gsapRefs.current[node.id] = el)}>
    {node.id == 'inner' ? (
      <>
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(colorr);
            g.drawCircle(0, 0, 10);
            g.endFill();
          }}
        />
        <Text text={node.name} anchor={0.5} x={0} y={-20} style={{ fill: "white", fontSize: 20, fontWeight: "400", fontFamily: "Poppins" }} />
      </>
    ) : node.name ? (
      <>
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(colorr);
            g.drawCircle(0, 0, 4);
            g.endFill();
          }}
        />
        <Text text={node.name} anchor={0.5} x={0} y={-14} style={{ fill: colorr, fontSize: 14, fontFamily: "Poppins" }} />
      </>
    ) : null}
  </Container>
);

const NetworkVisual = ({ tags, radius = 240, bgcolor = 0x007bff, styles }) => {
  const gsapRefs = useRef({});
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 800 });
  const services = createSphereNodes(tags, radius);
  const connections = services.flatMap((_, i) => findClosestNodes(services, i));
  const [animatedNodes, setAnimatedNodes] = useState(services);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setStageDimensions({ width, height });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isDragging) return;
    const rotateSphere = () => {
      setRotation((prev) => ({ x: prev.x + 0.005, y: prev.y + 0.005 }));
      requestAnimationFrame(rotateSphere);
    };
    rotateSphere();
  }, [isDragging]);

  useEffect(() => {
    setAnimatedNodes(applyRotation(services, rotation));
  }, [rotation]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - lastMouse.x) * 0.005;
    const deltaY = (e.clientY - lastMouse.y) * 0.005;
    setRotation((prev) => ({ x: prev.x + deltaY, y: prev.y + deltaX }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const centerX = stageDimensions.width / 2;
  const centerY = stageDimensions.height / 2;

  return (
    <div
      ref={containerRef}
      className={`${styles} w-full h-full cursor-grab  contain bg-transparent`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Stage width={800} height={800} options={{ backgroundAlpha: 0, antialias: true }}>
        {connections.map(([startId, endId], i) => (
          <Edge
            key={i}
            start={animatedNodes[startId]}
            end={animatedNodes[endId]}
            opacity={0.8}
            centerX={centerX}
            centerY={centerY}
          />
        ))}
        {animatedNodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            gsapRefs={gsapRefs}
            colorr={bgcolor}
            centerX={centerX}
            centerY={centerY}
          />
        ))}
      </Stage>
    </div>
  );
};

export default NetworkVisual;