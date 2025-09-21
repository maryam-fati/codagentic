import React, { useState, useEffect, useRef } from "react";
import { MoveRight, Lightbulb } from "lucide-react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import CustomScrollbar from "./CustomScrollbar";
import { gsap } from "gsap";
import SmoothScrollProvider from "./SmoothScrollProvider";
import Welcome from "./Welcome";
import Background from "./Background";
import SoundWave from "./SoundWave";

import music from "../assets/audio/music.mp3";
import axios from "axios";
import {
  Play,
  Pause,
  ChevronLeft, ChevronRight,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const Main = () => {
  const audioRef = useRef(new Audio(music));
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showwell, setShowwell] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  const url = import.meta.env.VITE_SERVER;
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollIntervalRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setTimeout(() => {

        setIsExpanded(false);
      }, 3000);
      handleClick();

    }
  };


  // useEffect(() => {
  //   if (isAutoScrolling) {
  //     // Start stuck detection
  //     stuckCheckIntervalRef.current = setInterval(() => {
  //       const currentScroll = window.pageYOffset;
  //       if (currentScroll === lastScrollPosRef.current) {
  //         // Not moving, try to restart auto-scroll
  //         startAutoScrollInterval();
  //       } else {
  //         // Moving, update last position
  //         lastScrollPosRef.current = currentScroll;
  //       }
  //     }, 100);
  //   } else {
  //     // Stop stuck detection
  //     if (stuckCheckIntervalRef.current) {
  //       clearInterval(stuckCheckIntervalRef.current);
  //       stuckCheckIntervalRef.current = null;
  //     }
  //   }
  //   // Cleanup on unmount
  //   return () => {
  //     if (stuckCheckIntervalRef.current) {
  //       clearInterval(stuckCheckIntervalRef.current);
  //       stuckCheckIntervalRef.current = null;
  //     }
  //   };
  // }, [isAutoScrolling]);

  const stopAutoScrollInterval = () => {
    console.log("Stopping auto-scroll interval");
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  };

const startAutoScrollInterval = () => {
    // if (isAutoScrolling) return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      return;
    }

    setIsAutoScrolling(true);

    const interval = setInterval(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll >= maxScroll) {
        stopAutoScrollInterval();
      } else {
        window.scrollBy(0, 15); // Increased from 15 to 30 pixels per interval
      }
    }, 40); // Decreased from 30ms to 5ms interval = ~200fps - MUCH FASTER

    scrollIntervalRef.current = interval;
  };

const restartAutoScroll = () => {
    stopAutoScrollInterval();
    // window.scrollTo(0, 0);
    window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth"
});


    // setTimeout(() => {
    //   startAutoScrollInterval();
    // }, 500);
  };



  const getdata = async () => {
    try {
      const res = await axios.get(`${url}/industry`);
      console.log(res);
      setData(res.data.industry);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getdata3 = async () => {
    try {
      const res = await axios.get(`${url}/founder`);
      console.log(res);
      setData3(res.data.founder);
    } catch (error) {
      console.error("Error fetching founder:", error);
    }
  };

  useEffect(() => {
    getdata();
    getdata3();
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.6;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Audio control based on scroll
  useEffect(() => {
    const audio = audioRef.current;

    const handleScrollStart = () => {
      // Only play if showwell is false (Welcome component is not shown)
      // if (showwell) return;

      if (audio.paused) {
        audio.play().catch(console.error);
      }
      gsap.to(audio, { volume: 0.3, duration: 0.5 });
      setIsPlaying(true);
    };

    const handleScrollEnd = debounce(() => {
      // Stop audio when scrolling stops
      gsap.to(audio, {
        volume: 0,
        duration: 1,
        onComplete: () => {
          audio.pause();
          setIsPlaying(false);
        }
      });
    }, 2000); // 2 seconds after scroll stops

    const handleScroll = () => {
      handleScrollStart();
      handleScrollEnd();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showwell]); // Add showwell as dependency

  // Start audio when showwell becomes false
  // useEffect(() => {
  //   const audio = audioRef.current;

  //   if (!showwell) {
  //     // Reset audio to start and play
  //     audio.currentTime = 0;
  //     audio.play().then(() => {
  //       gsap.to(audio, {
  //         volume: 0.3,
  //         duration: 1,
  //         onComplete: () => setIsPlaying(true),
  //       });
  //     }).catch(console.error);

  //     // Start auto scroll after 3 seconds
  //     setTimeout(() => {
  //       startAutoScrollInterval();
  //     }, 5000);
  //   } else {
  //     // Stop audio when showwell is true
  //     gsap.to(audio, {
  //       volume: 0,
  //       duration: 1,
  //       onComplete: () => {
  //         audio.pause();
  //         setIsPlaying(false);
  //       },
  //     });
  //   }
  // }, [showwell]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return; // Don't allow manual toggle when Welcome is shown

    const shouldPlay = !isPlaying;

    if (shouldPlay) {
      audio
        .play()
        .then(() =>
          gsap.to(audio, {
            volume: 0.3,
            duration: 1,
            onComplete: () => setIsPlaying(true),
          })
        )
        .catch(console.error);
    } else {
      gsap.to(audio, {
        volume: 0,
        duration: 1,
        onComplete: () => {
          audio.pause();
          setIsPlaying(false);
        },
      });
    }
  };

  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (!isExpanded) {
        setIsExpanded(true);
      } else {
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });
        setIsExpanded(false);
      }
    } else {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }
  };

  const getToken = () => {
    const itemStr = localStorage.getItem("authToken");
    console.log(itemStr);
    if (!itemStr) {
      setShowwell(true);
      return;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if expired
    if (now.getTime() < item.expiry) {
      setShowwell(false);
    } else {
      localStorage.removeItem("authToken");
      setShowwell(true);
    }
  };

  useEffect(() => {
    getToken();
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set playback speed to half
    }
  }, []);

  useEffect(() => {
    const moveGlow = (e) => {
      const glowSize = 30;
      gsap.to(".glow", {
        x: e.clientX - glowSize,
        y: e.clientY - glowSize,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  return (
    <div  className="relative ">
      <div className="fixed top-0  left-0 z-[-100] w-full h-screen">
        <video
          ref={videoRef}
          loop
          autoPlay
          muted
          playsInline
          preload="auto"
          className="h-screen w-full object-bottom object-cover"
        >
          <source src="/bg4.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-[110px]  hidden md:flex items-start justify-start h-[110px] glow fixed  pointer-events-none">
          <div
            className="w-[26px] h-[26px] rounded-full fixed"
            style={{
              background: "white",
              boxShadow: "0 0 10px 2px rgba(255, 255, 255,1)",
              filter: "blur(2px)",
            }}
          />
        </div>

      <motion.div
        className={`fixed bottom-4 left-3 md:bottom-3 !z-[999] md:left-2 text-sm border rounded-full hover:bg-gradient-to-br from-[#00b4cc] transition-all duration-300 ease-in-out to-green !border-green text-white hidden md:flex items-center group cursor-pointer overflow-hidden`}
        animate={{
          width: isExpanded ? "auto" : "50px",
          paddingLeft: isExpanded ? "16px" : "15px",
          paddingRight: isExpanded ? "16px" : "15px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Lightbulb Icon and Content */}
        <motion.div
          onClick={handleButtonClick}
          className="flex items-center gap-2 py-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb className="text-white flex-shrink-0" size={18} />

          {/* Expandable Text Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2 whitespace-nowrap overflow-hidden"
              >
                <span>Got an idea? Let's chat</span>
                <MoveRight
                  className="text-white group-hover:translate-x-2 transition-all duration-300 ease-in-out flex-shrink-0"
                  size={18}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>


       {/*  <Background /> */}
      <CustomScrollbar />

      <Navbar isAutoScrolling={isAutoScrolling} />

      <div title="Sound and Scrolling menu" className={`${isControlsVisible ? "backdrop-blur-sm" : ""} flex fixed bottom-[2px]  md:bottom-6 shadow-sm shadow-black  rounded-md p-2 right-[2px] md:right-6 !z-[100] items-center `}>
        {/* Collapsible Arrow Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsControlsVisible(!isControlsVisible)}
          className=" cursor-pointer   size-[40px] focus:outline-none active:outline-none  flex items-center justify-center !border-green text-white  transition-all duration-300 "
          title={isControlsVisible ? "Hide Controls" : "Show Controls"}
        >
          {isControlsVisible ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </motion.button>

        {/* Animated Controls Container */}
        <AnimatePresence>
          {isControlsVisible && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-4 "
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  isAutoScrolling
                    ? {
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                    : {}
                }
                onClick={() => {
                  if (isAutoScrolling) {
                    stopAutoScrollInterval();
                  } else {
                    startAutoScrollInterval();
                  }
                }}
                className={`rounded-full cursor-pointer box-border shadow-sm shadow-green hover:scale-105 size-[40px] border-[1px] flex items-center justify-center !border-green text-white hover:bg-green hover:text-white transition-all duration-300 ${isAutoScrolling ? "bg-green text-white" : "bg-transparent"
                  }`}
                title={isAutoScrolling ? "Pause Auto-Scroll" : "Start Auto-Scroll"}
              >
                {isAutoScrolling ? <Pause size={16} /> : <Play size={16} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  restartAutoScroll()
                }}
                className="cursor-pointer rounded-full box-border  shadow-sm shadow-green size-[40px] border-[1px] flex items-center justify-center !border-green text-white hover:bg-green hover:text-white hover:scale-105 transition-all duration-300 bg-transparent"
                title="Back to Top"
              >
                <RotateCcw size={16} />
              </motion.button>

              <SoundWave isPlaying={isPlaying} togglePlay={togglePlay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* {showwell && ( */}
      <Welcome
            togglePlay={togglePlay}
            startAutoScroll={startAutoScrollInterval}
          />
      {/* )} */}

      <SmoothScrollProvider>
        <Hero data={data} data4={data3} />
      </SmoothScrollProvider>
    </div>
  );
};

export default Main;