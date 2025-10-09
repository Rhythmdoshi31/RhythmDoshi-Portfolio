"use client";
import React, { useState } from "react";
import { Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import Button from "./ui/Button";
export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <nav className="w-[75%] z-10 absolute top-2 left-[50%] transform -translate-x-1/2 md:w-[45%]">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Pages">
          <ProductItem description="Landing Page" href="/" /> 
          <ProductItem description="About Me" href="#about" /> 
          <ProductItem description="Skills" href="#skills" /> 
          <ProductItem description="Projects" href="#projects" /> 
          <ProductItem description="Contact Me" href="#contact" /> 
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Social">
          <ProductItem description="LinkedIn" href="https://www.linkedin.com/in/rhythmdoshi04" /> 
          <ProductItem description="GitHub" href="https://github.com/Rhythmdoshi31" /> 
          <ProductItem description="Leetcode" href="https://leetcode.com/u/Rhythmdoshi31/" />
        </MenuItem>
        <Button />
      </Menu>
    </nav>
  );
}