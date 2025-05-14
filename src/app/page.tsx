"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>This is the main content of the Landing page.</p>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        click me
      </button>
      {isVisible && (
        <AnimatedText text="你好，這是一段會動的文字。" delay={0.3} />
      )}
    </div>
  );
}
