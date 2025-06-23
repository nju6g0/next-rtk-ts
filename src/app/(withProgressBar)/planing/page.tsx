"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import AnimatedText from "@/components/animatedText";
import scene1Image from "../../../../public/planing/scene1.svg";
import scene2Image from "../../../../public/planing/scene2.svg";
import scene3Image from "../../../../public/planing/scene3.png";
import clockImage from "../../../../public/planing/time.png";

function Scene1({ onChangeScene }: { onChangeScene: (scene: number) => void }) {
  const LINES = [
    "產品待辦清單好了之後 ， 我們來召集 ScrumMaster 和開發團隊共同召開短衝規劃會議（Sprint Planning）。短衝即是一個迭代，具有固定時間限制，我們會在這個會議中，決定要完成哪些工作事項來達到商業需求，列出短衝待辦清單（Sprint Backlog，並由開發團隊在接下來的產品開發週期裡執行。",
  ];
  const [animationDone, setAnimationDone] = useState(false);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!animationDone) return;
      // if (e.target instanceof HTMLElement && e.target.classList.contains("arrow")) {
      onChangeScene(1);
      setAnimationDone(false);
      // }
    },
    [animationDone]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <>
      <RoleWithDialog
        roleName={ROLES.PO}
        text={LINES}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.LEFT}
        reverse
        onAnimationDone={() => {
          setAnimationDone(true);
        }}
        onFinish={() => {
          console.log("動畫結束");
        }}
        currentIndex={0}
      />
      <div className="flex items-end p-10">
        <div className="grow">
          <Image
            src={scene1Image.src}
            className="m-auto"
            alt="planing"
            width={scene1Image.width}
            height={scene1Image.height}
          />
        </div>
        <div className="w-[300px]">
          <Role roleName={ROLES.SM} withAnimation={false} />
        </div>
      </div>
    </>
  );
}
function Scene2({ onChangeScene }: { onChangeScene: (scene: number) => void }) {
  const LINES = [
    "哦哦 ， 你是新來的前端吧 ！ 我是這次的 ScrumMaster MM ， 我的工作主要是促成開發團隊成員協作 、 引導團隊進行自省會議 ， 提升團隊成員對 Scrum 瞭解 。",
    "這兩位是 EE 和 GG ， 是我們開發團隊的成員唷～ 我們團隊一次 Sprint 週期是兩週的時間 ， 依照我的觀察 ， 目前團隊可以負擔的點數 (Story Point) 大約是20 點左右。",
  ];
  const [current, setCurrent] = useState(1);
  const [animationDone, setAnimationDone] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!animationDone) return;
      if (current >= LINES.length - 1) {
        onChangeScene(2);
      } else {
        setCurrent((prev) => prev + 1);
      }
      setAnimationDone(false);
    },
    [animationDone]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderContent = () => {
    switch (current) {
      case 0:
        return (
          <div className="flex items-start p-10">
            <div className="w-[250px] rotate-180">
              <Role roleName={ROLES.PO} withAnimation={false} />
            </div>
            <div className="grow">
              <Image
                src={scene2Image.src}
                className="m-auto"
                alt="planing"
                width={scene2Image.width}
                height={scene2Image.height}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex items-start p-10">
            <div className="grow">
              <Image
                src={scene3Image.src}
                className="m-auto"
                alt="planing"
                width={scene3Image.width}
                height={scene3Image.height}
              />
            </div>
            <div className="w-[200px] rotate-180">
              <Role roleName={ROLES.EE} withAnimation={false} />
            </div>
            <div className="w-[200px] rotate-180">
              <Role roleName={ROLES.GG} withAnimation={false} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      {renderContent()}
      <RoleWithDialog
        roleName={ROLES.SM}
        text={LINES}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.RIGHT}
        onAnimationDone={() => {}}
        onFinish={() => {
          console.log("動畫結束");
        }}
        currentIndex={0}
      />
    </>
  );
}

const Book = ({
  num,
  bgColor = "bg-primary",
  borderColor = "border-primary",
}: {
  num?: number;
  bgColor?: string;
  borderColor?: string;
}) => (
  <div className="relative flex w-[150px] h-[150px]">
    <div className={`border-5 ${borderColor} w-[30px] rounded-[12px]`} />
    <div
      className={`grow border-5 ${borderColor} rounded-[12px_0_0_12px] flex items-center justify-center`}
    >
      <div
        className={`rounded-[50%] w-[50px] h-[50px] text-center leading-[50px] font-bold text-xl ${bgColor}`}
      >
        {num}
      </div>
    </div>
    {num && (
      <div className="absolute top-[-10px] right-[-10px]">
        <div
          className={`relative border-3 ${borderColor} rounded-[25px] w-[50px] h-[50px] bg-cover-dark`}
        >
          <div
            className={`absolute top-[50%] left-[50%] w-[20px] h-[3px] origin-left rotate-270 rounded-[3px] ${bgColor}`}
          />
          <div
            className={`absolute top-[50%] left-[50%] w-[20px] h-[3px] origin-left rotate-[-30deg] rounded-[3px] ${bgColor}`}
          />
        </div>
      </div>
    )}
  </div>
);

function Scene3({ onChangeScene }: { onChangeScene: (scene: number) => void }) {
  const LINES = [
    "欸新來的 ， 你應該不知道點數是什麼意思吧ㄏㄏ ， 我來跟你介紹一下吧～Story Point 目的是為了衡量速度 ， 是用大概花費的時間預估出的相對點數哦 。",
    "以 「 費氏數列 」 的 1 、2 、3 、5 、8 、13、21 s來估算各項 Story 的分數 。 Story Point 越小 ， 表示這個 Story 花費時間越少 ； 越大 ， 花費時間則越多 。 如果出現了一個 21 分 ， 可能表示這個 Story 太龐大 ， 需要再拆分細項執行唷 ！",
  ];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [animationDone, setAnimationDone] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!animationDone) return;
      if (currentIndex >= LINES.length - 1) {
        onChangeScene(3);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      setAnimationDone(false);
    },
    [animationDone]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderContent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <>
            <Image
              src={clockImage.src}
              alt="clock"
              width={clockImage.width}
              height={clockImage.height}
            />
            <div>
              <div className="flex justify-center gap-10 mb-4">
                {Array.from({ length: 3 }, (x, i) => i).map((el) => (
                  <Book key={el + "book"} />
                ))}
              </div>
              <div className="flex justify-center gap-10">
                {Array.from({ length: 4 }, (x, i) => i).map((el) => (
                  <Book key={el + "book"} />
                ))}
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex justify-center gap-10 mb-4">
              <Book num={1} />
              <Book num={2} />
              <Book num={3} />
            </div>
            <div className="flex justify-center gap-10">
              <Book num={5} />
              <Book num={8} />
              <Book
                num={13}
                bgColor="bg-role-ee"
                borderColor="border-role-ee"
              />
              <Book
                num={21}
                bgColor="bg-role-gg"
                borderColor="border-role-gg"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex items-start p-10">
        <RoleWithDialog
          roleName={ROLES.EE}
          text={LINES}
          textInitialDelay={1.2}
          textIntervalDelay={0.1}
          direction={DIRECTIONS.RIGHT}
          reverse
          onAnimationDone={() => {}}
          onFinish={() => {
            console.log("動畫結束");
          }}
          currentIndex={0}
        />
        <div className="w-[350px] rotate-180 ml-4">
          <Role roleName={ROLES.GG} withAnimation={false} />
        </div>
      </div>
      <div className="px-10">{renderContent()}</div>
    </>
  );
}
export default function PlaningPage() {
  const [currentScene, setCurrentScene] = useState(2);
  const changeScene = (scene: number) => {
    setCurrentScene(scene);
  };
  const renderScene = () => {
    switch (currentScene) {
      case 0:
        return <Scene1 onChangeScene={changeScene} />;
      case 1:
        return <Scene2 onChangeScene={changeScene} />;
      case 2:
        return <Scene3 onChangeScene={changeScene} />;
      default:
        return null;
    }
  };
  return renderScene();
}
