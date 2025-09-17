import React, { useEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger  from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Incard from "./InCard"


gsap.registerPlugin(ScrollTrigger);

// const Card = ({ title, des, list, list2 }) => {
//   const cardRef = useRef(null);

//   useGSAP(() => {
//     const card = cardRef.current;

//     gsap.fromTo(
//       card,
//       { rotateY: 50 }, // Start flipped
//       {
//         rotateY: -10, // Flip to front
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: card,
//           // start: "top 80%",
//           start: "top 90%",
//           end: "top -50%",

//           marker: true,
//           toggleActions: "play none none reverse",

//         },
//       }
//     );
//         // Hover Effect: Reset to rotateY 0 on hover
//         card.addEventListener("mouseenter", () => {
//           gsap.to(card, { rotateY: 0, duration: 0.5, ease: "power2.out" });
//         });
    
//         // Reset back to scroll state when hover leaves
//         card.addEventListener("mouseleave", () => {
//           gsap.to(card, { rotateY: -15, duration: 0.5, ease: "power2.out" });
//         });
    
//         // Cleanup event listeners on unmount
//         return () => {
//           card.removeEventListener("mouseenter", () => {});
//           card.removeEventListener("mouseleave", () => {});
//         };
//   }, []);

//   return (
//     <div id={'industries'} className="relative  w-full md:w-[440px] h-[10vh] perspective-1000">
//       <div
//         ref={cardRef}
//         className="relative transition-all duration-300  hover:scale-[1.2] ease-in-out w-full md:w-[440px] min-h-[450px] hover:bg-[#00327c2d] px-5 py-10 font-poppins shadow-2xl rounded-2xl space-y-6 shadow-[#00000063]"
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         {/* Front Side */}
//         <div className="absolute inset-0 hover:bg-[#00327c] hover:scale-[1.2] bg-[#00327c9a] transition-all duration-500 ease-in-out rounded-2xl space-y-6 w-full h-full flex flex-col justify-center items-center text-center backface-hidden">
//           <span className="absolute top-0 right-0 size-8    rounded-bl-full bg-green"></span>
//           <h2 className="text-4xl">{title}</h2>
//           <p className="text-md text-gray-300 font-Raleway">{des}</p>
//           <ul className="font-Raleway space-y-1 text-green">
//             {list.map((l, index) => (
//               <li
//                 className="flex opacity-80 hover:opacity-100 py-2 group px-4 rounded-full hover:scale-105 hover:bg-[#00327c2d] items-center transition-all duration-500 ease-in-out gap-4 text-sm"
//                 key={index}
//               >
//                 <span className="transition-all group-hover:translate-x-3 duration-500 ease-in-out">
//                   <MoveRight />
//                 </span>
//                 <span>{l}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="flex items-center justify-center gap-4 flex-wrap">
//             {list2.map((l, index) => {
//               let [[key, value]] = Object.entries(l);
//               return (
//                 <div
//                   className="text-sm shadow-[#000000] shadow-2xl hover:scale-105 group flex bg-[#00327c2d] transition-all duration-300 ease-in-out rounded-md gap-1 flex-col-reverse  p-2 py-3 text-green"
//                   key={index}
//                 >
//                   <span className="md:px-3">{key}</span>
//                   <span className="text-gray-300 group-hover:text-green">
//                     {value}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Back Side */}
//         <div
//           className="absolute inset-0 w-full h-full flex justify-center items-center bg-[#00234d] text-white rounded-2xl"
//           style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
//         ></div>
//       </div>
//     </div>
//   );
// };

const Indust = () => {
  const data = [
    {
      title: "Healthcare",
      des: "Revolutionizing patient care with AI-powered diagnostics and personalized treatment plans.",
      list: [
        "Predictive Analytics for Patient Outcomes",
        "Medical Image Analysis",
        "Healthcare Process Automation",
      ],
      list2: [
        { Accuracy: "99.9%" },
        { "Time Reduction": "60%" },
        { "Cost Saving": "$2M+" },
      ],
    },
    {
      title: "Finance",
      des: "Transforming financial services with intelligent risk assessment and fraud detection.",
      list: [
        "Real-time Fraud Detection",
        "Automated Trading Systems",
        "Risk Management",
      ],
      list2: [
        { "Fraud Prevention": "$5M+" },
        { Accuracy: "99.9%" },
        { Processing: "<10ms" },
      ],
    },
    {
      title: "Manufacturing",
      des: "Optimizing production processes with predictive maintenance and quality control.",
      list: [
        "Predictive Maintenance",
        "Quality Control Automation",
        "Supply Chain Optimization",
      ],
      list2: [
        { Efficiency: "+45%" },
        { "Defect Reduction": "85%" },
        { Downtime: "-70%" },
      ],
    },
    {
      title: "Retail",
      des: "Enhancing customer experience with personalized recommendations and inventory management.",
      list: [
        "Customer Behavior Analytics",
        "Inventory Optimization",
        "Personalized Marketing",
      ],
      list2: [
        { Sales: "+35%" },
        { Retention: "+60%" },
        { Satisfaction: "95%" },
      ],
    },
  ];
  return (
    <div className="min-h-screen px-4 mx-auto py-20 flex lg:gap-32  items-center flex-col w-full text-white">
      <h1 className="text-3xl lg:text-6xl">AI Solutions Across Sectors</h1>
      <div className="flex flex-wrap  w-full  lg:gap-x-32 gap-20 lg:gap-y-[20vh] items-center justify-center">
        {data.map((data, index) => (
          <Card
            key={index}
            title={data.title}
            des={data.des}
            list={data.list}
            list2={data.list2}
          />
        ))}
      </div>
    </div>
  );
};

export default Indust;
