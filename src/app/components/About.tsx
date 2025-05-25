"use client";

import React from "react";
import { FlipWords } from "./ui/flip-words";

export default function About() {
  return (
    <div className="h-full w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="p-4 w-full md:w-[80%] lg:w-[52%] mx-auto relative z-10 pt-20 md:pt-0">
        <FlipWords words={["About Me", "Who Am I", "My Story"]} className="text-5xl font-bold text-white mb-16 text-center" />
        <div className="text-white text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
          <p className="mb-6">
            I&apos;m a passionate Full Stack Developer with a keen eye for creating elegant solutions in the least amount of time. I specialize in building responsive web applications using modern technologies.
          </p>
          <p className="mb-6">
            My journey in web development started with a curiosity about how things work on the internet. This curiosity led me to dive deep into both frontend and backend technologies, allowing me to build complete solutions from scratch.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blog posts. I believe in continuous learning and staying updated with the latest industry trends.
          </p>
        </div>
      </div>
    </div>
  );
}