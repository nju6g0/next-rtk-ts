"use client";

import { useEffect, useState } from "react";
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
  const [animationDone, setAnimationDone] = useState(false);

  // 所有字動畫結束後，顯示 ▼
  useEffect(() => {
    const totalDuration = initialDelay + text.length * intervalDelay;
    const timeout = setTimeout(() => {
      setAnimationDone(true);
    }, totalDuration * 1000);

    return () => clearTimeout(timeout);
  }, [initialDelay, intervalDelay, text.length]);

  return (
    <div
      aria-label={text}
      className={`text-sm md:text-2xl relative py-4 pt-6 pb-10 ${className}`}
    >
      <div>
        {[...text].map((char, i) => (
          <span
            key={char + i}
            className={styles.animatedLetter}
            style={{ animationDelay: `${initialDelay + i * intervalDelay}s` }}
          >
            {char}
          </span>
        ))}
        {/* 右下角彈跳箭頭提示 */}
        {animationDone && (
          <div
            className={`absolute right-2 bottom-0 ${styles.triangle} ${styles.bounceIndicator}`}
          />
        )}
      </div>
    </div>
  );
}
