import React from 'react'
import { CodeBlock } from "./code-block";
import { FlipWords } from './ui/flip-words';

const Skills = () => {
  return (
    <div className="w-full md:w-[80%] lg:w-[52%] mx-auto px-4 mb-16 md:mb-28">
          <FlipWords words={["Skills", "SuperPowers", "Weapons"]} className="text-5xl font-bold text-white mb-16 text-center" />
          <CodeBlock
            language="javascript"
            filename="developer.js"
            code={`const profile = {
  name: "Rhythm Doshi",
  title: "Full-Stack Developer | Problem Solver | Tech Dabbler",
  skills: [
    "Java", "JavaScript", "TypeScript", "Node.js",
    "Express.js", "MongoDB", "React.js", "Redux", "Next.js",
    "PostgreSQL", "MySQL", "DSA", "GitHub", "TailwindCSS",
    "StackOverflow Surfing"
  ],
  hireable() {
    return (
      this.traits.hardWorker &&
      this.traits.problemSolver &&
      this.skills.length >= 5 &&
      this.traits.alwaysCurious
    );
  },
  funFact: "Code so clean, it once got mistaken for poetry.",
  funFact2: "Can center a div on the first try (most days).",
  funFact3: "Tried rm -rf / once. Never again.",
  speak() {
    console.log("Hi, I'm " + this.name + ", your next favorite developer.");
  }
};

profile.speak();
console.log("Hireable? " + (profile.hireable() ? "Absolutely!" : "Maybe try again later..."));`}
          />
        </div>
)
}

export default Skills