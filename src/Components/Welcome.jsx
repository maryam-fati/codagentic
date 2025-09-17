import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  MoveRight,
} from "lucide-react";

// Advanced AI Neural Network Particle System
const AIParticleSystem = ({ mouseX, mouseY, isHovering }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const neuronsRef = useRef([]);
  const connectionsRef = useRef([]);
  const dataStreamsRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Initialize AI particle system
    const initAISystem = () => {
      particlesRef.current = [];
      neuronsRef.current = [];
      connectionsRef.current = [];
      dataStreamsRef.current = [];

      // AI Neural nodes
      for (let i = 0; i < 60; i++) {
        neuronsRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.8 + 0.4,
          color: "#00BFFF",
          life: Math.random() * 500 + 300,
          type: "neuron",
          pulse: Math.random() * Math.PI * 2,
          activity: Math.random(),
        });
      }

      // Data particles
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.3,
          color: Math.random() > 0.7 ? "#00BFFF" : "#FFFFFF",
          life: Math.random() * 300 + 200,
          type: "data",
          pulse: Math.random() * Math.PI * 2,
          binary: Math.random() > 0.5 ? "1" : "0",
        });
      }

      // AI processing streams
      for (let i = 0; i < 15; i++) {
        dataStreamsRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          targetX: Math.random() * rect.width,
          targetY: Math.random() * rect.height,
          progress: 0,
          speed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.6 + 0.4,
          color: "#00BFFF",
          data: Array.from({ length: 10 }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ).join(""),
        });
      }
    };

    // Update AI system
    const updateAISystem = () => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const time = Date.now() * 0.001;

      // Update neural network
      neuronsRef.current.forEach((neuron, index) => {
        const dx = mouseX - neuron.x;
        const dy = mouseY - neuron.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // AI activation on hover
        if (isHovering && distance < 250) {
          neuron.activity = Math.min(neuron.activity + 0.05, 1);
          neuron.size = Math.min(neuron.size * 1.02, 8);
          neuron.opacity = Math.min(neuron.opacity * 1.01, 1);
        } else {
          neuron.activity = Math.max(neuron.activity - 0.02, 0.1);
          neuron.size = Math.max(neuron.size * 0.99, 2);
          neuron.opacity = Math.max(neuron.opacity * 0.99, 0.4);
        }

        // Neural drift
        neuron.vx += (Math.random() - 0.5) * 0.01;
        neuron.vy += (Math.random() - 0.5) * 0.01;
        neuron.vx *= 0.99;
        neuron.vy *= 0.99;

        neuron.x += neuron.vx;
        neuron.y += neuron.vy;
        neuron.pulse += 0.1;

        // Boundary wrapping
        if (neuron.x < 0) neuron.x = rect.width;
        if (neuron.x > rect.width) neuron.x = 0;
        if (neuron.y < 0) neuron.y = rect.height;
        if (neuron.y > rect.height) neuron.y = 0;
      });

      // Update data particles
      particlesRef.current.forEach((particle, index) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // AI data attraction
        if (isHovering && distance < 200) {
          const force = (200 - distance) / 200;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.03;
          particle.vy += Math.sin(angle) * force * 0.03;
          particle.opacity = Math.min(particle.opacity * 1.02, 1);
        }

        // Data flow
        const wave = Math.sin(time * 2 + particle.x * 0.01) * 0.5;
        particle.vy += wave * 0.002;

        // Update position
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.15;

        // Boundary wrapping
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;
      });

      // Update neural connections
      connectionsRef.current = [];
      for (let i = 0; i < neuronsRef.current.length; i++) {
        for (let j = i + 1; j < neuronsRef.current.length; j++) {
          const n1 = neuronsRef.current[i];
          const n2 = neuronsRef.current[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const strength =
              (((150 - distance) / 150) * (n1.activity + n2.activity)) / 2;
            connectionsRef.current.push({
              x1: n1.x,
              y1: n1.y,
              x2: n2.x,
              y2: n2.y,
              opacity: strength * 0.5,
              pulse: Math.sin(time * 3 + i + j) * 0.3 + 0.7,
              activity: strength,
            });
          }
        }
      }

      // Update data streams
      dataStreamsRef.current.forEach((stream) => {
        stream.progress += stream.speed;
        if (stream.progress >= 1) {
          stream.x = Math.random() * rect.width;
          stream.y = Math.random() * rect.height;
          stream.targetX = Math.random() * rect.width;
          stream.targetY = Math.random() * rect.height;
          stream.progress = 0;
          stream.data = Array.from({ length: 10 }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ).join("");
        }
      });
    };

    // Render AI system
    const renderAISystem = () => {
      // Clear with fade
      ctx.fillStyle = "rgba(2, 6, 23, 0.05)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Render neural connections
      connectionsRef.current.forEach((connection) => {
        const gradient = ctx.createLinearGradient(
          connection.x1,
          connection.y1,
          connection.x2,
          connection.y2
        );
        gradient.addColorStop(
          0,
          `rgba(0, 191, 255, ${connection.opacity * connection.pulse})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(0, 191, 255, ${connection.opacity * connection.pulse * 1.5})`
        );
        gradient.addColorStop(
          1,
          `rgba(0, 191, 255, ${connection.opacity * connection.pulse})`
        );

        ctx.strokeStyle = gradient;
        ctx.lineWidth = connection.activity * 2 + 0.5;
        ctx.beginPath();
        ctx.moveTo(connection.x1, connection.y1);
        ctx.lineTo(connection.x2, connection.y2);
        ctx.stroke();

        // Data packets along connections
        if (connection.activity > 0.5) {
          const packetX =
            connection.x1 +
            (connection.x2 - connection.x1) *
              (Math.sin(Date.now() * 0.005) * 0.5 + 0.5);
          const packetY =
            connection.y1 +
            (connection.y2 - connection.y1) *
              (Math.sin(Date.now() * 0.005) * 0.5 + 0.5);

          ctx.fillStyle = `rgba(0, 191, 255, ${connection.activity})`;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render data streams
      dataStreamsRef.current.forEach((stream) => {
        const currentX =
          stream.x + (stream.targetX - stream.x) * stream.progress;
        const currentY =
          stream.y + (stream.targetY - stream.y) * stream.progress;

        ctx.fillStyle = `rgba(0, 191, 255, ${stream.opacity})`;
        ctx.font = "8px monospace";
        ctx.fillText(stream.data, currentX, currentY);

        // Stream trail
        for (let i = 0; i < 5; i++) {
          const trailProgress = Math.max(0, stream.progress - i * 0.1);
          const trailX = stream.x + (stream.targetX - stream.x) * trailProgress;
          const trailY = stream.y + (stream.targetY - stream.y) * trailProgress;
          const trailOpacity = stream.opacity * (1 - i * 0.2);

          ctx.fillStyle = `rgba(0, 191, 255, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render neurons
      neuronsRef.current.forEach((neuron) => {
        const pulseSize = Math.max(
          0.5,
          neuron.size + Math.sin(neuron.pulse) * neuron.activity
        );

        // Neural core with activity glow
        const neuralGradient = ctx.createRadialGradient(
          neuron.x,
          neuron.y,
          0,
          neuron.x,
          neuron.y,
          Math.max(1, pulseSize * 3)
        );
        neuralGradient.addColorStop(
          0,
          `rgba(0, 191, 255, ${neuron.opacity * neuron.activity})`
        );
        neuralGradient.addColorStop(
          0.3,
          `rgba(0, 191, 255, ${neuron.opacity * 0.7})`
        );
        neuralGradient.addColorStop(1, `rgba(0, 191, 255, 0)`);

        ctx.fillStyle = neuralGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Activity ring
        if (neuron.activity > 0.3) {
          ctx.strokeStyle = `rgba(0, 191, 255, ${neuron.activity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, pulseSize * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Render data particles
      particlesRef.current.forEach((particle) => {
        const pulseSize = Math.max(
          0.3,
          particle.size + Math.sin(particle.pulse) * 0.5
        );

        if (particle.type === "data") {
          const dataGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            Math.max(1, pulseSize * 2)
          );
          dataGradient.addColorStop(
            0,
            `rgba(${
              particle.color === "#00BFFF" ? "0, 191, 255" : "255, 255, 255"
            }, ${particle.opacity})`
          );
          dataGradient.addColorStop(
            1,
            `rgba(${
              particle.color === "#00BFFF" ? "0, 191, 255" : "255, 255, 255"
            }, 0)`
          );

          ctx.fillStyle = dataGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();

          // Binary data
          if (Math.random() > 0.95) {
            ctx.fillStyle = `rgba(0, 191, 255, ${particle.opacity * 0.7})`;
            ctx.font = "6px monospace";
            ctx.fillText(particle.binary, particle.x + 5, particle.y);
          }
        }
      });
    };

    const animate = () => {
      updateAISystem();
      renderAISystem();
      animationRef.current = requestAnimationFrame(animate);
    };

    initAISystem();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouseX, mouseY, isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

// AI-Powered 3D Logo with Neural Effects
const AILogo3D = ({ mouseX, mouseY, isHovering }) => {
  const logoRef = useRef(null);
  const [brainWave, setBrainWave] = useState(0);

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 400, damping: 25 });

  // AI brain wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBrainWave((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logoRef.current && isHovering) {
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (mouseX - centerX) / (rect.width / 2);
      const deltaY = (mouseY - centerY) / (rect.height / 2);

      rotateY.set(deltaX * 20);
      rotateX.set(-deltaY * 20);
      scale.set(1.1);
    } else {
      rotateX.set(Math.sin(Date.now() * 0.001) * 2);
      rotateY.set(Math.cos(Date.now() * 0.0015) * 3);
      scale.set(1);
    }
  }, [mouseX, mouseY, isHovering, rotateX, rotateY, scale]);

  return (
    <motion.div
      ref={logoRef}
      className="relative z-10"
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative">
        {/* AI processing layers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              filter: `blur(${(i + 1) * 3}px) hue-rotate(${i * 10}deg)`,
              opacity: isHovering ? 0.1 + 0.3 / (i + 1) : 0.05,
              transform: `translateZ(${-i * 5}px)`,
            }}
            animate={{
              opacity: isHovering ? [0.1, 0.3, 0.1] : [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Codagentic%20Logo-9cWJs4szHX70H5JN8onpdaaAX0hqwO.png"
              alt="CodAgentic AI Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}

        {/* Main AI logo */}
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Codagentic%20Logo-9cWJs4szHX70H5JN8onpdaaAX0hqwO.png"
          alt="CodAgentic AI Logo"
          className="relative z-10 w-full h-full object-contain"
          animate={{
            filter: isHovering
              ? [
                  "brightness(1.3) saturate(1.5) drop-shadow(0 0 40px rgba(0,191,255,0.8))",
                  "brightness(1.3) saturate(1.5) drop-shadow(0 0 40px rgba(0,191,255,0.8))",
                ]
              : [
                  "brightness(1.1) saturate(1.2) drop-shadow(0 0 20px rgba(0,191,255,0.4))",
                  "brightness(1.1) saturate(1.2) drop-shadow(0 0 20px rgba(0,191,255,0.4))",
                ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

// Dynamic AI Background
const AIBackground = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* AI processing grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,191,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* AI data streams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
          style={{
            width: "200px",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: ["-200px", "100vw"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}

      {/* AI processing nodes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full border border-cyan-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0.3, 1, 0.3],
            borderColor: [
              "rgba(0,191,255,0.3)",
              "rgba(0,191,255,1)",
              "rgba(0,191,255,0.3)",
            ],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Binary rain */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400 font-mono text-xs opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
          }}
          animate={{
            y: ["0vh", "120vh"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ).join("")}
        </motion.div>
      ))}
    </div>
  );
};

const Welcome = ({ togglePlay, startAutoScroll }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoHovering, setIsLogoHovering] = useState(false);
  const [textPhase, setTextPhase] = useState(0);
  const [aiStatus, setAiStatus] = useState("INITIALIZING");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  // AI status cycling
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextPhase((prev) => (prev + 1) % 3)
    }, 5000)

    return () => {
      clearInterval(textInterval)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY]
  );

  const setToken = (token) => {
    const now = new Date();
    const expiry = now.getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    const item = {
      token: token,
      expiry: expiry,
    };

    localStorage.setItem("authToken", JSON.stringify(item));
  };

  const handleStart = () => {
    setIsVisible(false);
    setToken("show");

    setTimeout(() => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.height = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.touchAction = "auto";
      document.documentElement.style.touchAction = "auto";
      togglePlay();

      // Trigger smooth scroll to the first section after welcome disappears
      setTimeout(() => {
        // const firstSection = document.getElementById("intro");
        // if (firstSection) {
        //   firstSection.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start",
        //   });
        // }

        // Start auto-scroll after a delay
        setTimeout(() => {
          if (startAutoScroll) {
            startAutoScroll();
          } else {
            console.log("Welcome: startAutoScroll function is not available");
          }
        }, 4000); // Start auto-scroll 4 seconds after scrolling to first section
      }, 500); // Small delay to ensure welcome animation completes
    }, 1000);
  };

  // In your parent component
  useEffect(() => {
    if (!isVisible) {
      // Kill all motion animations
      const motionElements = containerRef.current?.querySelectorAll('[style*="transform"]');
      motionElements?.forEach(el => {
        el.style.transform = 'none';
        el.style.opacity = '0';
      });

      // Stop CSS animations
      const animatedElements = containerRef.current?.querySelectorAll('*');
      animatedElements?.forEach(el => {
        el.style.animation = 'none';
      });
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.height = '100vh';
      document.body.style.touchAction = 'none';
      document.documentElement.style.touchAction = 'none';
    }
  }, [isVisible]);

  const aiSubtitles = [
    "AI-Powered Smart Solutions & Seamless Automation",
    "Neural Networks • Machine Learning • Deep Intelligence",
    "Transforming Business Through Artificial Intelligence",
  ];

  return (
    <>
      {isVisible ? (
        <div
          ref={containerRef}
          className="h-screen w-full fixed top-0 z-[1000] flex flex-col items-center justify-center overflow-hidden font-sans"
          style={{
            background: `
              linear-gradient(135deg, rgba(2, 6, 23, 0.98) 0%, rgba(15, 23, 42, 0.96) 50%, rgba(2, 6, 23, 0.98) 100%)
            `,
          }}

        >
          {/* AI background */}
          <AIBackground isVisible={isVisible} />

          {/* AI navigation */}
          {/* <AINavigation /> */}

          {/* AI particle system */}
          <AIParticleSystem
            isVisible={isVisible}
            mouseX={mouseX.get()}
            mouseY={mouseY.get()}
            isHovering={isLogoHovering}
          />

          {/* Main AI content */}
          <div className="relative z-10 flex flex-col items-center space-y-16">
            {/* AI logo */}
            <motion.div
              className="relative w-96 h-32 md:w-[700px] md:h-56"
              onHoverStart={() => setIsLogoHovering(true)}
              onHoverEnd={() => setIsLogoHovering(false)}
              initial={{ y: -150, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 2,
                delay: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
            >
              <AILogo3D
                isVisible={isVisible}
                mouseX={mouseX.get()}
                mouseY={mouseY.get()}
                isHovering={isLogoHovering}
              />
            </motion.div>

            {/* AI subtitle with typing effect */}
            <motion.div
              className="text-center h-20 flex items-center relative"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              <div
                className="absolute inset-0 rounded-2xl backdrop-blur-md border !border-cyan-500/20"
                style={{
                  background: "rgba(0, 191, 255, 0.05)",
                  boxShadow: "0 8px 32px rgba(0, 191, 255, 0.1)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.p
                  key={textPhase}
                  className="relative text-lg md:text-xl font-light tracking-wide text-white px-8 py-4 font-Raleway"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.span>
                    {aiSubtitles[textPhase]}
                  </motion.span>
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* AI-powered Get Started button */}
            <motion.button
              className="group relative px-12 py-4 text-xl font-bold text-white rounded-xl overflow-hidden border-2 !border-cyan-500/50 bg-transparent backdrop-blur-sm"
              initial={{ y: 150, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1.8,
                delay: 2,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(0, 191, 255, 1)",
                backgroundColor: "rgba(0, 191, 255, 0.15)",

              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
            >
              {/* AI processing background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, transparent, rgba(0,191,255,0.1), transparent)",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Button content */}
              <div className="relative flex items-center gap-4">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(0,191,255,1)",
                      "0 0 10px rgba(255,255,255,0.8)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  Get Started
                </motion.span>
                <motion.div
                  className="group-hover:translate-x-2 transition-transform duration-300"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <MoveRight size={24} />
                </motion.div>
              </div>

              {/* AI ripple effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-cyan-400"
                  animate={{
                    scale: [1, 2],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.button>
          </div>

          {/* AI status indicators */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Welcome;