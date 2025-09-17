import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import SplitType from "split-type";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef([]);
  const services = useRef([]);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const mobileSettings = {
    end: '+=1500',
  };
  const desktopSettings = {
    end: '+=9000',

  };

  const textContent = [
    `Automate <span class="text-[#2eafff]"> Smarter </span>, Scale Faster—<span class="text-[#2eafff]"> AI </span> That Works Seamlessly While You Reach New <span class="text-[#2eafff]"> Heights </span>.`,
    `At <span class="text-[#2eafff]"> CodAgentic </span>, we're fueling your <span class="text-[#2eafff]"> ideas </span> with <span class="text-[#2eafff]"> AI </span> that thinks, learns, and scales alongside Your <span class="text-[#2eafff]"> vision </span>.`,
    `Our <span class="text-[#2eafff]"> mission </span> is to shatter the <span class="text-[#2eafff]"> myth </span> that <span class="text-[#2eafff]"> AI </span> is only for tech giants bringing <span class="text-[#2eafff]"> intelligent </span> Automation to Everyone.`,
  ];

  useGSAP(() => {
    // let sections = textContent.length;
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.About',
        pin: true,
        start: "top top",
        scrub: 1,
        ...(isMobile ? mobileSettings : desktopSettings)


      }
    });

    textContent.forEach((_, index) => {
      const split = new SplitType(textRefs.current[index], { types: "words" });

      // Initial hide
      gsap.set(split.words, {
        opacity: 0,
        y: 10,
      });

      // Create animation sequence
      tl.to(textRefs.current[index], {
        opacity: 1,
        duration: 1,
        onStart: () => setActiveIndex(index)
      })
      tl.to(split.words, {
        opacity: 1,
        y: 0,

        stagger: 0.1,
        ease: "power2.inOut"
      },)
      tl.to(textRefs.current[index], {
        opacity: 0,
        scale: 0.8,
        rotateX: 70,
        y: -10,
      }, "+=1.5");
    });
  }, []);

  return (
    <>

      <div ref={containerRef} className="h-screen relative overflow-hidden">
        <div className="sticky top-0 h-screen  flex items-center justify-center">

          {textContent.map((text, index) => (
            <div
              key={index}
              ref={el => (textRefs.current[index] = el)}
              className={`fixed text-center   text-3xl lg:text-5xl xl:text-[50px] text-white md:w-[70%] leading-tight transition-opacity ${activeIndex === index ? 'opacity-100' : 'opacity-100 pointer-events-none'
                }`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </div>
      </div>
    </>

  );
};

export default About;