import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Word from './Word.jsx'
import { useGSAP } from "@gsap/react";
import Believe from './Believe.jsx'
import { Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



const Aboutus = () => {

  return (
    <>
      <div id='about' className='container mx-auto space-y-24 py-28 my-[15vh] md:my-0 min-h-screen   mb-0 px-4 md:px-0'>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }} className='font-Raleway text-center my-20 text-2xl md:text-4xl text-white leading-relaxed uppercase  xl:w-3/4 md:w-full mx-auto'>
          Meet the <span className='text-green  font-Raleway'>Brains</span> behind the <span className='text-white font-Raleway'>Innovation</span>  <span className='text-green font-Raleway'>at <Word>CODAGENTIC</Word></span>
        </motion.p>
        <div className='flex gap-10 items-center justify-center flex-wrap'>
          <Profilecard
            title={'Mustafa <span class="text-white">Shoukat</span>'}
            role={'Co-founder '}
            image={'https://placehold.co/200x200'}
            descrp={'Mustafa is an AI engineer and Co-founder of CodAgentic, bringing four years of hands-on experience in generative AI and business automation.'}
          />
          <Profilecard
            title={'Gulenoor <span class="text-white">Khalid</span>'}
            role={'Co-founder '}
            image={'https://placehold.co/200x200'}
            descrp={'Gulenoor Khalid, our Co-founder and Generative AI expert. Her commitment to transforming businesses through AI automation is at the heart of everything we do at CodAgentic.'}
          />
        </div>
      </div>

    </>

  );
};

export default Aboutus;
