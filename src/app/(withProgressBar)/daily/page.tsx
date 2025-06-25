"use client";
import React, { useState, useEffect } from "react";

import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";

const LINES = [""];
export default function Daily() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationDone = () => {
    setAnimationDone(true);
    setCurrentScene((prevScene) => prevScene + 1);
  };

  const handleClick = () => {
    if (!animationDone) return;

    setCurrentIndex((prevIndex) => {
      if (prevIndex >= LINES.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
    setAnimationDone(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderScene = () => {
    switch (currentScene) {
      case 0:
        return (
          <div className="flex-1 flex justify-end items-end p-10">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentScene(1)}
            >
              開始 Sprint
            </button>
          </div>
        );
      case 1:
        return <div className="flex-1">Drag and Drop Component Here</div>;
      case 2:
        return (
          <div className="flex-1 flex justify-center items-center p-10 bg-cover-dark font-bold">
            點擊畫面任意處繼續
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <RoleWithDialog
        roleName={ROLES.EE}
        text={LINES}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.RIGHT}
        reverse
        onAnimationDone={handleAnimationDone}
        onFinish={() => {}}
        currentIndex={currentIndex}
      />
      <div className="grow-1 p-4">{renderScene()}</div>
    </div>
  );
}
