import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CalendarDays , MoveRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import SplitType from "split-type";
import { motion } from "framer-motion";
import axios from 'axios'
import { format } from 'date-fns';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from 'react-router';

import { Navigation } from 'swiper/modules';



gsap.registerPlugin(ScrollTrigger);


const Blogs = () => {
  const url = import.meta.env.VITE_SERVER;
const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [data, setData] = useState([])


  useGSAP(() => {


    const split = new SplitType(titleRef.current, { types: "chars, words" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 50, },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 2,
        },
      }
    );
  }, []);

  const getdata = async () => {


    try {
      const res = await axios.get(`${url}/blog`);
      setData(res.data.post)

    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  useEffect(() => {

    getdata()

  }, [])






  // const data = [
  //   {
  //     img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas libero explicabo voluptate ipsam aliquam pariatur impedit iste adipisci numquam minus, sequi tempora maiores mollitia eligendi quod nostrum. In, tempora.",
  //     date: "22 May 2025",
  //   },
  //   {
  //     img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas libero explicabo voluptate ipsam aliquam pariatur impedit iste adipisci numquam minus, sequi tempora maiores mollitia eligendi quod nostrum. In, tempora.",
  //     date: "22 May 2025",
  //   },
  //   {
  //     img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas libero explicabo voluptate ipsam aliquam pariatur impedit iste adipisci numquam minus, sequi tempora maiores mollitia eligendi quod nostrum. In, tempora.",
  //     date: "22 May 2025",
  //   },
  //   {
  //     img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas libero explicabo voluptate ipsam aliquam pariatur impedit iste adipisci numquam minus, sequi tempora maiores mollitia eligendi quod nostrum. In, tempora.",
  //     date: "22 May 2025",
  //   }
  // ];
  const handleRedirect = (title) => {
  const encodedTitle = encodeURIComponent(title); // Handles spaces/special characters
  navigate(`/blog/${encodedTitle}`);
  navigate(0)
}

return (
  <div ref={containerRef} className="z-[999] relative min-h-screen">
    <div className="mx-auto flex flex-col my-[15vh] md:my-0 items-center justify-center lg:px-10 container md:absolute md:top-1/2 z-[50] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 space-y-10 text-[white] font-poppins">
      <div className="flex flex-wrap items-center justify-between space-y-20 uppercase xl:p-10">
        <h2 ref={titleRef} className="lg:text-4xl text-lg px-2 text-center md:mx-0 mx-auto">
          Featured Blog Posts
        </h2>
      </div>
      
      <div className="w-full">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          breakpoints={{
            640: {
              navigation: false, 
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 35
            }
          }}
        >
          {data.map((data, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="cursor-pointer h-full" onClick={() => handleRedirect(data.title)}>
                <div className="
                  w-full 
                  h-[400px]
                  max-w-[380px] 
                  mx-auto

                  overflow-hidden 
                  font-Raleway  
                  bg-transparent 
                  rounded-lg
                 
                  transition-all 
                  duration-300 
                  ease-in-out
                  hover:shadow-xl
                  hover:shadow-black/30
                  backdrop-blur-sm
                  flex
                  flex-col
                ">
                  {/* Image Section - Fixed Height */}
                  <motion.div 
                    onClick={() => handleRedirect(data.title)}  
                    className="w-full h-[200px] cursor-pointer overflow-hidden shrink-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1]
                      }
                    }}
                  >
                    <motion.img
                      src={data.image}
                      className="object-cover w-full h-full hover:scale-110 transition-all duration-500 ease-out rounded-t-lg"
                      alt={data.title}
                      initial={{ scale: 1.2 }}
                      whileInView={{ 
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          ease: [0.23, 1, 0.32, 1]
                        }
                      }}
                    />
                  </motion.div>
                  
                  {/* Content Section - Fixed Height with Internal Flexbox */}
                  <div 
                    onClick={() => handleRedirect(data.title)} 
                    className="h-[200px] p-4 flex cursor-pointer flex-col justify-between shrink-0"
                  >
                    {/* Title Container - Fixed Space */}
                    <div className="h-[60px] flex items-start">
                      <motion.h1 
                        className="text-base md:text-lg line-clamp-2 font-medium font-Raleway leading-tight hover:text-gray-200 transition-colors duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        {data.title}
                      </motion.h1>
                    </div>
                    
                    {/* Description Container - Fixed Space */}

                    
                    {/* Bottom Section - Fixed Space */}
                    <div className="h-[20px] flex items-center justify-between">
                      {/* Date */}
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        <span className="flex items-center gap-2 text-xs text-green font-sans">
                          <CalendarDays className="text-blues" size={12} />
                          {format(new Date(data.date), 'MMM dd yyyy')}
                        </span>
                      </motion.div>
                      
                      {/* Read More Indicator */}

                    </div>
                                        <div className="h-[100px] flex flex-col justify-center">
                      <motion.p 
                        className="text-sm text-gray-300 line-clamp-4 leading-relaxed"
                        initial={{ 
                          opacity: 0, 
                          y: 20,
                          scaleX: 0.95
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          scaleX: 1,
                          transition: {
                            duration: 0.8,
                            delay: 0.3,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        {data.discription}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
);
};

export default Blogs;
