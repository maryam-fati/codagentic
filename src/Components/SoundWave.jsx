import { motion } from "framer-motion";
import { Music } from "lucide-react";
import Word from "./Word";

const SoundWave = ({ isPlaying, togglePlay }) => {
  return (
    <div className=" flex items-center gap-2" onClick={togglePlay}>
    <div onClick={togglePlay} className="size-[40px]  hover:scale-105 md:size-[40px] justify-center rounded-full  shadow-black !border-green !border-[1px] shadow-sm shadow-green  transition-all duration-300 ease-in-out backdrop-blur-lg  flex space-x-1 items-center cursor-pointer ">

      {[1, 2, 3, 4,5].map((_, i) => (
        <motion.div
        title="Sound"
        onClick={togglePlay}
        
          key={i}
          animate={isPlaying ? { 
            height: [5, 15, 6, 15, 5], // More varied height pattern
          } : { height: 10 }}
          transition={isPlaying ? { 
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15, // Stagger animation starts
            times: [0.2, 0.4, 0.6, 0.8, 1] // Controls keyframe timing
          } : { duration: 0 }}
          className="w-[2px] bg-white h-[10px]  cursor-pointer rounded-md"
        />
      ))}
    </div>

    </div>
  );
};

export default SoundWave;