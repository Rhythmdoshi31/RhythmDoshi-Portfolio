"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import { ExpandableCardDemo } from "../components/Projects";
import ContactForm from "../components/Contact";

export default function Home() {
  const [cooldown, setCooldown] = useState(0);
  const COOLDOWN_TIME = 10;

  // Count down cooldown timer if active
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Function to start cooldown after a successful send
  const startCooldown = () => setCooldown(COOLDOWN_TIME);

  return (
    <main className="min-h-screen" style={{ userSelect: "none" }}>
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
        <footer id="contact" className="h-screen flex items-center justify-center">
          {/* Pass cooldown and startCooldown handler to ContactForm */}
          <ContactForm cooldown={cooldown} startCooldown={startCooldown} />
        </footer>
      </div>
    </main>
  );
}
