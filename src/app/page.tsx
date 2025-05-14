"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog from "@/components/roleWithDialog";

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
          initialDelay={1.2}
          intervalDelay={0.1}
        />
      )}
      <RoleWithDialog
        roleName={ROLES.GG}
        text="你好，這是一段會動的文字。"
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
      />
      <div style={{ width: "100px", height: "100px" }}>
        <Role roleName={ROLES.EE} />
      </div>
      <div style={{ width: "100px", height: "100px" }}>
        <Role withAnimation={false} />
      </div>
    </div>
  );
}
