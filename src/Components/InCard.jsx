import React, { useEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Card = ({ title, des, list = [], list2 = [], index }) => {
  const cardRef = useRef(null);

  return (
    <div className={`card card${index} absolute shadow-2xl shadow-black border-[1px] !border-white bg-[#00437a] hover:scale-110 md:hover:scale-125 scale-110 md:-translate-x-3/4 left-1/2 md:left-[calc(100%-150px)] -translate-x-1/2 rounded-2xl p-6 px-2 top-1/6  md:top-1/2 md:-translate-y-1/2 w-[90%] md:w-[320px]  lg:w-[360px] max-h-[350px] lg:h-[400px]`}>
      <div ref={cardRef} className="bg-[#00437a] md:hover:scale-105 rounded-xl transition-all duration-500 ease-in-out space-y-4 md:space-y-6 w-full h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-xl">{title}</h2>
        <p className="text-xs md:text-sm text-white font-sans">{des}</p>
        <ul className="font-Raleway space-y-1">
          {list.map((l, index) => (
            <li
              className="flex opacity-80 gap-2 hover:opacity-100 py-2 group px-4 rounded-full hover:scale-[1.05] hover:bg-[#00327c2d] items-center transition-all duration-500 ease-in-out text-xs"
              key={index}
            >
              <span className="transition-all group-hover:translate-x-2 duration-500 ease-in-out">
                <MoveRight />
              </span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {list2.map((l, index) => {
            let [[key, value]] = Object.entries(l);
            return (
              <div
                className="text-xs shadow-[#000000] text-green shadow-2xl hover:scale-105 group flex transition-all duration-300 ease-in-out rounded-md flex-col-reverse text-white"
                key={index}
              >
                <span className="md:px-3">{key}</span>
                <span className="group-hover:text-green">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;