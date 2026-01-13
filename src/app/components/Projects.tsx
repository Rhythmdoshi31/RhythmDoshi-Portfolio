"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";
import { IconBrandGithub } from "@tabler/icons-react";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null)
  );

  return (
    <div className="h-full w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="p-4 w-full md:w-[80%] lg:w-[52%] mx-auto relative z-10 pt-20 md:pt-0">
        <FlipWords
          words={["Projects", "Builds", "Creations"]}
          className="text-5xl font-bold text-white mb-16 text-center"
        />
        <div>
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0  grid place-items-center z-[100]">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.05,
                    },
                  }}
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                >
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <Image
                      width={200}
                      height={200}
                      src={active.src}
                      alt={active.title}
                      className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                    />
                  </motion.div>

                  <div>
                    <div className="flex justify-between items-start p-4">
                      <div className="">
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-medium text-neutral-700 dark:text-neutral-200 text-3xl md:text-base"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-lg md:text-base"
                        >
                          {active.description}
                        </motion.p>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        {active.gitLink && (
                          <motion.a
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            href={active.gitLink}
                            target="_blank"
                            className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                          >
                            <IconBrandGithub stroke={2} />
                          </motion.a>
                        )}
                        {active.ctaLink && (
                          <motion.a
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            href={active.ctaLink}
                            target="_blank"
                            className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                          >
                            {active.ctaText}
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 relative px-4">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }} // <-- add this line
                        className="text-neutral-600 text-sm md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      >
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <ul className="max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
            {cards.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.title}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 flex-col  w-full">
                  <motion.div layoutId={`image-${card.title}-${id}`}>
                    <Image
                      width={200}
                      height={200}
                      src={card.src}
                      alt={card.title}
                      className="h-60 w-full rounded-lg object-cover object-top"
                    />
                  </motion.div>
                  <div className="flex justify-center items-center flex-col">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left md:text-base"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
  description: "Google Drive That Feels Right",
  title: "BetterDrive",
  src: "/converted/Bdrive.webp",
  ctaText: "Join Waitlist",
  ctaLink: "https://betterdrive.rhythmdoshi.site",
  gitLink: "https://github.com/Rhythmdoshi31/BetterDrive",
  content: () => {
    return (
      <p>
  Whether you{"'"}re organizing personal documents or collaborating on projects, BetterDrive brings simplicity and speed to your workflow, right in the browser.
</p>

    );},
  },
  {
    description: "Society Management Platform",
    title: "SocietySync",
    src: "/converted/p1.webp",
    ctaText: "Visit",
    ctaLink: "https://society-sync-neon.vercel.app",
    gitLink: "https://github.com/Rhythmdoshi31/SocietySync",
    content: () => {
      return (
        <p>
          SocietySync is a modern web app designed to simplify residential
          society management. It offers tools for admins, residents, and workers
          to manage tasks like maintenance, events, payments, notices, and
          visitor logs—all in one place. <br />
          Built with a secure backend and a responsive frontend, SocietySync
          ensures a smooth experience across devices. Key features include{" "}
          <span className="text-green-500 font-semibold">React</span>,{" "}
          <span className="text-blue-500 font-semibold">Node.js</span>,{" "}
          <span className="text-purple-500 font-semibold">Express</span>, and{" "}
          <span className="text-red-500 font-semibold">MongoDB</span>. With
          role-based access and future-ready upgrades, it brings safety,
          convenience, and efficiency to every society.
        </p>
      );
    },
  },
  {
    description: "Movie & TV Rating Hub",
    title: "CineClair",
    src: "/converted/p4.webp",
    ctaText: "Visit",
    ctaLink: "https://cineclair.netlify.app/",
    gitLink: "https://github.com/Rhythmdoshi31/CINECLAIR",
    content: () => {
      return (
        <p>
          CINÉCLAIR is a sleek, responsive movie discovery app that lets users
          explore trending films, popular shows, and actor profiles in real
          time. With dedicated sections, powerful search, and smooth UI
          animations, it delivers an immersive browsing experience across
          devices. <br />
          Built with{" "}
          <span className="text-green-500 font-semibold">ReactJS</span>,{" "}
          <span className="text-yellow-500 font-semibold">Redux</span>,{" "}
          <span className="text-blue-500 font-semibold">Tailwind CSS</span>, and{" "}
          <span className="text-pink-500 font-semibold">Framer Motion</span>,
          CINÉCLAIR integrates real-time movie data via API and offers a modern,
          performant UI.
        </p>
      );
    },
  },

  {
    description: "Video Sharing Platform",
    title: "BuzzTube",
    src: "/converted/p2.webp",
    ctaText: "Visit",
    gitLink: "https://github.com/Rhythmdoshi31/BuzzTube",
    ctaLink: "https://buzztube-production.up.railway.app/",
    content: () => {
      return (
        <p>
          BuzzTube is a full-featured video-sharing platform where users can
          upload and watch videos and shorts, create personalized channels, and
          engage through comments and subscriptions. <br />
          Built using{" "}
          <span className="text-green-500 font-semibold">Node.js</span>,{" "}
          <span className="text-purple-500 font-semibold">Express.js</span>,{" "}
          <span className="text-indigo-500 font-semibold">MongoDB</span>, and{" "}
          <span className="text-red-500 font-semibold">Google OAuth2</span>,
          BuzzTube offers smooth streaming with Bunny Stream and manages
          thumbnails with ImageKit.
        </p>
      );
    },
  },
  {
    description: "Online Chat Application",
    title: "LivelyChat",
    src: "/converted/p3.webp",
    ctaText: "Visit",
    gitLink: "https://github.com/Rhythmdoshi31/Lively",
    ctaLink: "https://lively.rhythmdoshi.site/",
    content: () => {
      return (
        <p>
          LivelyChat is an anonymous, real-time chat and video call platform
          that connects users globally without sign-ups. <br />
          It uses{" "}
          <span className="text-purple-500 font-semibold">WebSockets</span> for
          messaging, <span className="text-blue-500 font-semibold">WebRTC</span>{" "}
          for video calls, and is built with{" "}
          <span className="text-green-500 font-semibold">Node.js</span>,{" "}
          <span className="text-indigo-500 font-semibold">Express.js</span>,{" "}
          <span className="text-pink-500 font-semibold">EJS</span>, and{" "}
          <span className="text-yellow-500 font-semibold">TailwindCSS</span> for
          a smooth and secure experience.
        </p>
      );
    },
  },
  {
    description: "The HangMan Game",
    title: "HangMan",
    src: "/converted/p5.webp",
    ctaText: "Visit",
    gitLink: "https://github.com/Rhythmdoshi31/Hangman-Game",
    content: () => {
      return (
        <p>
          React Hangman is a simple and engaging word-guessing game built with{" "}
          <span className="text-green-500 font-semibold">React</span>. It tracks
          guesses and win/lose conditions through a clean, interactive
          interface. <br />
          Setup involves cloning the repo, installing dependencies, and running
          the dev server — all using modern{" "}
          <span className="text-blue-500 font-semibold">
            JavaScript
          </span> and{" "}
          <span className="text-yellow-500 font-semibold">React Hooks</span> for
          smooth gameplay.
        </p>
      );
    },
  },
  {
    description: "Axel Agency (UI)",
    title: "Axel Agency",
    src: "/converted/p6.webp",
    ctaText: "Visit",
    gitLink: "https://github.com/Rhythmdoshi31/Axel-Agency-Website",
    ctaLink: "https://axel-agency.netlify.app/",
    content: () => {
      return (
        <p>
          Axel Agency Website is a modern, visually stunning web experience
          inspired by Obys Agency, featuring smooth scrolling and dynamic
          animations. <br />
          Built with <span className="text-green-500 font-semibold">
            HTML
          </span>, <span className="text-blue-500 font-semibold">CSS</span>,{" "}
          <span className="text-purple-500 font-semibold">JavaScript</span>, and
          libraries like{" "}
          <span className="text-green-500 font-semibold">GSAP</span>,{" "}
          <span className="text-red-500 font-semibold">ScrollTrigger</span>,{" "}
          <span className="text-blue-500 font-semibold">Locomotive Scroll</span>
          , and SheryJS to create seamless UI/UX and animations.
        </p>
      );
    },
  },
  {
    description: "Nexora (UI)",
    title: "Nexora",
    src: "/converted/p8.webp",
    ctaText: "Visit",
    gitLink: "https://github.com/Rhythmdoshi31/Nexora-Website",
    ctaLink: "https://nexora-website.netlify.app",
    content: () => {
      return (
        <p>
          Nexora is a sleek, interactive UI experience inspired by modern
          digital design principles, delivering fluid transitions and smooth
          user interaction. <br />
          Built with <span className="text-green-500 font-semibold">
            React
          </span>,{" "}
          <span className="text-blue-400 font-semibold">Tailwind CSS</span>,{" "}
          <span className="text-pink-500 font-semibold">Framer Motion</span>,
          and{" "}
          <span className="text-yellow-400 font-semibold">Locomotive Scroll</span>{" "}
          to craft visually appealing layouts and buttery-smooth scroll
          animations.
        </p>
      );
    },
  },
];
