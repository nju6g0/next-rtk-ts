"use client";
import React, { useEffect, useState, useCallback } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";

function ListItem({ text, classNames }: { text: string; classNames?: string }) {
  return (
    <div className={`border-2 border-primary p-5 rounded-xl ${classNames}`}>
      {text}
    </div>
  );
}
export default function IntroPage() {
  const TEXT = [
    "\ 碰 / 我是短衝小精靈，開發 A 組的 PO。PO 也就是產品負責人（Product Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （Product Backlog） 唷 ！",
    "剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了「 產品需求清單 」。 既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！ ",
    "換你來試試看吧！提示：請把需求拖移至產品待辦清單 ， 並調整其優先順序 。",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(2);
  const [animationDone, setAnimationDone] = useState(false);

  const changeScene = (index: number) => {
    return;
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
        return (
          <div className="flex-1 flex gap-4 w-[80%] mt-20 mx-auto">
            <div className="w-[300px]">
              <ListItem
                classNames="mt-20 ml-15 opacity-60"
                text="應徵者的線上履歷編輯器"
              />
              <ListItem
                classNames="mt-20 mr-15 opacity-60"
                text="後台職缺管理功能（資訊上架、下架、顯示應徵者資料）"
              />
            </div>
            <div className="w-[500px] flex flex-col flex-1 border-2 border-primary rounded-4xl overflow-hidden">
              <div className="bg-primary">
                <p className="text-2xl text-dark text-center font-bold pt-[20px]">
                  產品待辦清單
                </p>
                <p className="text-primary-100 text-base text-center pb-[20px]">
                  Product Backlog
                </p>
              </div>
              <div className="p-5 pl-16 flex-1 flex flex-col justify-between bg-(image:--linear-primary)">
                {[1, 2, 3, 4].map((el) => (
                  <div
                    key={el}
                    className="border-2 border-dashed border-primary h-[80px] rounded-xl"
                  />
                ))}
              </div>
            </div>
            <div className="w-[300px]">
              <ListItem
                classNames="mt-30 ml-15 opacity-60"
                text="會員系統（登入、註冊、權限管理）"
              />
              <ListItem classNames="mt-50" text="前台職缺列表、應徵" />
            </div>
          </div>
        );
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
