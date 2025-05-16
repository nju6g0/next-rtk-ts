"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";

export default function IntroPage() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <h3>This is Intro Page!!</h3>
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
          text="你好，這是一段會動的文字。文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字"
          initialDelay={1.2}
          intervalDelay={0.1}
        />
      )}
      {/* <RoleWithDialog
        roleName={ROLES.EE}
        text="你好，這是一段會動的文字。文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字。"
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.RIGHT}
        reverse
      />
      <div style={{ width: "100px", height: "100px" }}>
        <Role roleName={ROLES.EE} />
      </div>
      <div style={{ width: "100px", height: "100px" }}>
        <Role withAnimation={false} />
      </div> */}
    </>
  );
}
