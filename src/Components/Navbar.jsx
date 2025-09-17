import React, { useEffect, useState } from "react";
// import logo from "";
import { motion, AnimatePresence } from "framer-motion";
import SoundWave from "./SoundWave";
import {
  House,
  Handshake,
  Boxes,
  Factory,
  Newspaper,
  Headset,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const Navbar = ({
  isPlaying,
  togglePlay,
  disabled = false,
  isAutoScrolling,
  startAutoScroll,
  stopAutoScroll,
  restartAutoScroll,
}) => {
  const [selectedOption, setSelectedOption] = useState("intro");
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setaLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    "intro",
    "industries",
    "service",
    "about",
    "blogs",
    "contact",
  ];

  // Scroll handler to hide/show logo and soundwave
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Section observer for active navigation
  useEffect(() => {
    const observers = [];
    const options = { threshold: 0.1 };

    sections.forEach((section) => {
      const target = document.getElementById(section);
      if (target) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrolling) {
              setSelectedOption(section);
            }
          });
        }, options);
        observer.observe(target);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [isScrolling]);

  // Enhanced navigation click handler with additional smooth scroll
  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section || isScrolling) return;

    setIsScrolling(true);

    // Special handling for intro section - scroll to very top
    if (sectionId === "intro") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Set intro as selected when reaching top
      setSelectedOption("intro");

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
      return;
    }

    // Only apply additional scroll for industries section
    if (sectionId === "industries") {
      const additionalScroll = window.innerHeight * 1.2;

      // Get initial scroll position
      const initialScroll = window.pageYOffset;
      const sectionTop = section.getBoundingClientRect().top + initialScroll;

      // First scroll to section
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      // Wait for first scroll to complete
      const checkScroll = setInterval(() => {
        if (Math.abs(window.pageYOffset - sectionTop) < 10) {
          clearInterval(checkScroll);

          // Now do the additional scroll
          window.scrollTo({
            top: sectionTop + additionalScroll,
            behavior: "smooth",
          });

          // Reset scrolling state after complete animation
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }
      }, 100);

      // Failsafe to clear interval and reset state
      setTimeout(() => {
        clearInterval(checkScroll);
        setIsScrolling(false);
      }, 5000);
    } else {
      // For other sections, just do normal scroll
      section.scrollIntoView({ behavior: "smooth" });

      // Reset scrolling state after basic scroll
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Logo and SoundWave Container */}
      <motion.div
        key="logo-soundwave"
        animate={{ y: isAutoScrolling ? -100 : 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          duration: 0.3,
        }}
        className="relative md:fixed top-2 left-0 z-[999] flex items-center justify-between w-full px-2 md:px-10"
      >
        <a href="/" className="w-[200px]">
          <img className="object-cover" src={"/logo.png"} alt="logo" />
        </a>
        <div className="flex items-center gap-4">
          {/* <SoundWave isPlaying={isPlaying} togglePlay={togglePlay} /> */}
        </div>
      </motion.div>

      {/* Navigation List */}

      {/* {!isAutoScrolling ? ( */}
        <motion.ul
          animate={{ x: isAutoScrolling ? -100 : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
            duration: 0.3,
          }}
          key="nav-list"
          className={`hidden ${
            disabled ? "md:hidden" : "md:flex md:flex-col"
          } py-[10px] px-[15px] shadow-sm shadow-black backdrop-blur-lg fixed gap-3 rounded-lg z-[999] top-[50%] -translate-y-1/2 left-5`}
        >
          {sections.map((section) => (
            <motion.li
              key={section}
              onClick={() => handleNavClick(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-[12px] text-center !border-green !border-[1px] shadow-sm shadow-green flex items-center justify-center rounded-full text-sm cursor-pointer uppercase hover:bg-green hover:text-white transition-all duration-300 ${
                selectedOption === section
                  ? "text-gray-100 bg-green"
                  : "text-[white]"
              }`}
            >
              {section === "intro" ? (
                <House size={18} />
              ) : section === "service" ? (
                <Boxes size={18} />
              ) : section === "about" ? (
                <Handshake size={18} />
              ) : section === "industries" ? (
                <Factory size={18} />
              ) : section === "blogs" ? (
                <Newspaper size={18} />
              ) : section === "contact" ? (
                <Headset size={18} />
              ) : (
                "test"
              )}
            </motion.li>
          ))}
        </motion.ul>
      {/* ) : (
        ""
      )} */}
    </AnimatePresence>
  );
};

export default Navbar;
