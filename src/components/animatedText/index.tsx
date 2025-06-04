"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./styles.module.scss";

interface AnimatedTextProps {
  text: string[]; // 接收多段文字陣列
  initialDelay?: number;
  intervalDelay?: number;
  className?: string;
  currentIndex: number;
  onAnimationDone?: (index: number, text: string) => void; // 每段文字播放完畢後的回調
  onFinish?: () => void; // 完成全部文字後的回調
}

export default function AnimatedText({
  text,
  initialDelay = 0,
  intervalDelay = 0.05,
  className,
  currentIndex,
  onAnimationDone,
  onFinish,
}: AnimatedTextProps) {
  const [animationDone, setAnimationDone] = useState(false);
  const currentText = text[currentIndex] || "";

  // 控制每段文字播放完畢後，出現箭頭
  useEffect(() => {
    setAnimationDone(false);
    const totalDuration = initialDelay + currentText.length * intervalDelay;
    const timeout = setTimeout(() => {
      setAnimationDone(true);
    }, totalDuration * 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentText, initialDelay, intervalDelay]);

  useEffect(() => {
    if (animationDone && onAnimationDone) {
      onAnimationDone(currentIndex, currentText);
    }
  }, [animationDone]);
  // useEffect(() => {
  //   if (animationDone && onAnimationDone) {
  //     onAnimationDone(currentIndex, currentText);
  //   }
  //   if (animationDone && currentIndex === text.length - 1 && onFinish) {
  //     onFinish();
  //   }
  // }, [animationDone, currentIndex, onAnimationDone, onFinish, text.length]);

  return (
    <div
      aria-label={currentText}
      className={`text-sm md:text-2xl relative h-full ${className}`}
    >
      <div>
        {[...currentText].map((char, i) => (
          <span
            key={char + i}
            className={styles.animatedLetter}
            style={{ animationDelay: `${initialDelay + i * intervalDelay}s` }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* 右下角彈跳箭頭提示 */}
      {animationDone && currentIndex <= text.length - 1 && (
        <div
          className={`absolute right-2 bottom-0 ${styles.triangle} ${styles.bounceIndicator}`}
        />
      )}
    </div>
  );
}
