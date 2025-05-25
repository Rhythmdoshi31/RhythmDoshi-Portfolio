"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(17, 0, 26)",
  gradientBackgroundEnd = "rgb(0, 0, 0)",
  firstColor = "40, 56, 72",
  secondColor = "68, 52, 68",
  thirdColor = "64, 80, 80",
  fourthColor = "72, 52, 52",
  fifthColor = "80, 80, 56",
  pointerColor = "72, 68, 88",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const curX = useRef(0);
  const curY = useRef(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);
  

  useEffect(() => {
    const move = () => {
      curX.current += (tgX - curX.current) / 20;
      curY.current += (tgY - curY.current) / 20;

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;
      }

      animationRef.current = requestAnimationFrame(move);
    };

    animationRef.current = requestAnimationFrame(move);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0",
        "bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("", className)}>{children}</div>

      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {[
          { color: "first-color", animation: "animate-first", opacity: "opacity-100" },
          { color: "second-color", animation: "animate-second", opacity: "opacity-100" },
          { color: "third-color", animation: "animate-third", opacity: "opacity-100" },
          { color: "fourth-color", animation: "animate-fourth", opacity: "opacity-70" },
          { color: "fifth-color", animation: "animate-fifth", opacity: "opacity-100" },
        ].map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute",
              `bg-[radial-gradient(circle_at_center,_rgba(var(--${item.color}),_0.8)_0,_rgba(var(--${item.color}),_0)_50%)]`,
              "[mix-blend-mode:var(--blending-value)]",
              "w-[var(--size)] h-[var(--size)]",
              "top-1/2 left-1/2",
              "-translate-x-1/2 -translate-y-1/2",
              item.animation,
              item.opacity
            )}
          />
        ))}

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute w-full h-full -top-1/2 -left-1/2",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)]",
              "[mix-blend-mode:var(--blending-value)]",
              "opacity-70"
            )}
          />
        )}
      </div>
    </div>
  );
};
