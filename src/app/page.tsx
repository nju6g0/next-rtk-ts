"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";

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
        <AnimatedText
          className="font-bold text-dark"
          text="你好，這是一段會動的文字。"
          delay={0.3}
        />
      )}
      <Role roleName={ROLES.EE} />
      <Role withAnimation={false} />
    </div>
  );
}
