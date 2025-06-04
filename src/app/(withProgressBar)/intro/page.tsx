"use client";
import React, { useEffect, useState, useCallback } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";

export default function IntroPage() {
  const TEXT = [
    "\ 碰 / 我是短衝小精靈，開發 A 組的 PO。PO 也就是產品負責人（Product Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （Product Backlog） 唷 ！",
    "剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了「 產品需求清單 」。 既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！ ",
    "換你來試試看吧！提示：請把需求拖移至產品待辦清單 ， 並調整其優先順序 。",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  const changeScene = (index: number) => {
    setAnimationDone(true);
    setCurrentScene(index > TEXT.length - 1 ? index : index + 1);
  };
  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return (
          <div className="flex-1 text-center  w-full bg-linear-(--linear-cover) shadow-[0px_-10px_20px_rgba(10,13,20,0.20),0px_10px_10px_rgba(10,13,20,0.60)]">
            <div className="h-[100px]" />
            <Button.Secondary>點擊畫面任意處繼續</Button.Secondary>
          </div>
        );
      case 2:
        return <div>sample</div>;
      case 3:
        return <div>dnd</div>;
      default:
        return null;
    }
  };

  const handleClick = useCallback(() => {
    if (!animationDone) return;
    setCurrentIndex((prev) => (prev >= TEXT.length - 1 ? prev : prev + 1));
    setAnimationDone(false);
    if (currentScene < TEXT.length) {
      setCurrentScene(0);
    }
  }, [animationDone]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <>
      <RoleWithDialog
        roleName={ROLES.PO}
        text={TEXT}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.LEFT}
        reverse
        onAnimationDone={changeScene}
        onFinish={() => {
          console.log("動畫結束");
        }}
        currentIndex={currentIndex}
      />
      {renderScene()}
    </>
  );
}
