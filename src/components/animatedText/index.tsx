"use client";

// import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface AnimatedTextProps {
  text: string;
  initialDelay?: number; // 初始延遲（秒）
  intervalDelay?: number; // 每個字之間的延遲（秒）
  className?: string;
}

export default function AnimatedText({
  text,
  initialDelay = 0,
  intervalDelay = 0.1,
  className,
}: AnimatedTextProps) {
  // const containerRef = useRef<HTMLDivElement>(null);
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) setVisible(true);
  //     },
  //     { threshold: 0.5 }
  //   );
  //   if (containerRef.current) observer.observe(containerRef.current);
  //   return () => observer.disconnect();
  // }, []);
  return (
    <div
      // ref={containerRef}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      {[...text].map((char, i) => (
        <span
          key={char + i}
          // className={visible ? styles.animatedLetter : ""}
          className={styles.animatedLetter}
          style={{ animationDelay: `${initialDelay + i * intervalDelay}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
