"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import { ExpandableCardDemo } from "./components/Projects";
import ContactForm from "./components/Contact";

export default function Home() {
  const [cooldown, setCooldown] = useState(0);
  const startCooldown = () => setCooldown(10);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <main className="min-h-screen " style={{ userSelect: "none" }}>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Hero />
      <div className="min-h-[150vh] pt-20 w-full bg-black">
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects" className="mb-20">
          <ExpandableCardDemo />
        </div>
        <footer id="contact" className="h-screen flex items-center justify-center md:pb-40 lg:pb-0">
          <ContactForm cooldown={cooldown} startCooldown={startCooldown} />
        </footer>
      </div>
    </main>
  );
}
