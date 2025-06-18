import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { TypewriterEffect } from "./ui/typewriter-effect";

export default function Hero() {
  return (
    <BackgroundGradientAnimation className="absolute z-11 top-[46%] md:top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center pb-16">
        <h1 className="text-gray-100 text-center whitespace-nowrap mb-6">Hello, I&apos;m Rhythm. A passionate software Engineer.</h1>
        <TypewriterEffect
          words={[
            { text: "Code", className: "text-blue-500 dark:text-blue-400" },
            { text: "Sommelier", className: "text-blue-500 dark:text-blue-400" },
            { text: "Crafting" },
            { text: "Premium" },
            { text: "Digital" },
            { text: "Experiences", className: "text-blue-500 dark:text-blue-400" },
          ]}
        />
        <div className="flex items-center justify-center gap-4 mt-8">
            <a href="/converted/RhythmDoshiBR.pdf" download className="bg-gray-100 text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-300 cursor-pointer">Download CV</a>
            <a href="#contact" className="bg-[#243341] hover:bg-[#18212F] text-white px-4 py-2 rounded-md font-semibold cursor-pointer">Contact Me</a>
        </div>
    </BackgroundGradientAnimation>
  );
}