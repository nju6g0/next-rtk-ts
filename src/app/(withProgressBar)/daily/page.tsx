"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import Role, { ROLES, RoleNameType } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import dailyImage from "../../../../public/daily/sprint_daily.png";
import reviewImage from "../../../../public/daily/sprint_review.png";
import retroImage from "../../../../public/daily/sprint_retro.png";
import processImage from "../../../../public/daily/sprint_process.png";
import styles from "./styles.module.scss";

const Board = ({
  title,
  subTitle,
  role = ROLES.PO,
  classNames,
}: {
  title: string;
  subTitle: string;
  role?: RoleNameType;
  classNames?: string;
}) => {
  const color = {
    [ROLES.EE]: "role-ee",
    [ROLES.GG]: "role-gg",
    [ROLES.PO]: "primary",
    [ROLES.SM]: "role-sm",
  };
  return (
    <div
      className={`border-3 border-${color[role]} rounded-2xl p-3 ${classNames}`}
    >
      <p className={`text-${color[role]} font-bold text-center text-xl`}>
        {title}
      </p>
      <p className="text-primary text-center text-xs">{subTitle}</p>
    </div>
  );
};
const DropItem = ({ classNames }: { classNames: string }) => (
  <div
    className={`border-2 border-dashed border-primary w-[260px] h-[80px] rounded-2xl ${classNames}`}
  />
);
const LINES = [
  "等等等等等 ， 你都還不知道什麼是 Sprint 吧 ！ 讓我先為你介紹一下～仔細聽好唷 ， 等等會考考你 ！",
  "Sprint 是一個短衝 ， 開發團隊會在這期間執行開發 。 在這段期間內 ， 開發團隊舉辦每日站立會議 (Daily Scrum) ， 追蹤成員間的工作狀況 ， 在 Sprint 的結束也會包含短衝檢視會議 (Sprint Review) 以及短衝自省會議 (Sprint Retrospective)",
  "換你來試試看吧 ！ 在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？(點擊畫面任意處繼續)",
  "哼哼沒想到你這麼快就學會惹 ， 快結束了加油加油 ！",
];
export default function Daily() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [currentScene, setCurrentScene] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [showList, setShowList] = useState(false);

  const handleAnimationDone = () => {
    setAnimationDone(true);
    if (currentIndex === 1) {
      setShowList(true);
    }
    // setCurrentScene((prevScene) => prevScene + 1);
  };

  const handleClick = useCallback(() => {
    if (!animationDone) return;

    setCurrentIndex((prevIndex) => {
      if (prevIndex >= LINES.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
    setAnimationDone(false);
  }, [animationDone]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderScene = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className="flex-1 flex items-center justify-center gap-5">
            <div>
              {/* <Image
                src={dailyImage.src}
                alt="clock"
                width={dailyImage.width}
                height={dailyImage.height}
              /> */}
              <Board
                title="每日站立會議"
                subTitle="Daily Scrum"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-2">
                  <li className={`${styles.animaSlideDown}`}>昨天做了什麼？</li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "0.5s" }}
                  >
                    今天要做什麼？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "1s" }}
                  >
                    有什麼阻礙嗎？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "1.5s" }}
                  >
                    其他需要討論的事項？
                  </li>
                </ul>
              )}
            </div>
            <div>
              {/* <Image
                src={reviewImage.src}
                alt="clock"
                width={reviewImage.width}
                height={reviewImage.height}
              /> */}
              <Board
                title="短衝檢視會議"
                subTitle="Sprint Review"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-2">
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "2s" }}
                  >
                    今天要做什麼？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "2.5s" }}
                  >
                    有什麼阻礙嗎？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "3s" }}
                  >
                    其他需要討論的事項？
                  </li>
                </ul>
              )}
            </div>
            <div>
              {/* <Image
                src={retroImage.src}
                alt="clock"
                width={retroImage.width}
                height={retroImage.height}
              /> */}
              <Board
                title="短衝自省會議"
                subTitle="Sprint Retrospective"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-2">
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "3.5s" }}
                  >
                    今天要做什麼？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "4s" }}
                  >
                    有什麼阻礙嗎？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "4.5s" }}
                  >
                    其他需要討論的事項？
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "5s" }}
                  >
                    昨天做了什麼？
                  </li>
                </ul>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div
            className={`flex-1 flex gap-5 bg-contain bg-center bg-no-repeat w-[${processImage.width}px] h-[${processImage.height}px]`}
            style={{
              backgroundImage: `url("${processImage.src}")`,
            }}
          >
            <div className="flex flex-col justify-start gap-5 pl-[34px] border-1 border-primary">
              <div className="h-[150px]" />
              <Board
                title="產品待辦清單"
                subTitle="Product Backlog"
                classNames={`w-[260px] h-[80px] ${styles.twigLeft}`}
              />
              <Board
                title="短衝規劃會議"
                subTitle="Sprint Planning"
                classNames={`w-[260px] h-[80px] ${styles.twigLeft}`}
              />
              <Board
                title="短衝待辦清單"
                subTitle="Sprint Backlog"
                classNames={`w-[260px] h-[80px] ${styles.twigLeft}`}
              />
              <Board
                title="短衝"
                subTitle="Sprint"
                classNames={`w-[120px] h-[80px] ${styles.twigTop}`}
              />
            </div>
            <div className="flex-1 border-1 border-role-ee">
              <DropItem classNames={styles.twigLeft} />
              <DropItem classNames={styles.twigBottom} />
              <DropItem classNames={styles.twigBottom} />
            </div>
            <div className="border-1 border-role-gg">
              <Board
                title="每日站立會議"
                subTitle="Daily Scrum"
                role={ROLES.EE}
                classNames="w-[260px] h-[80px]"
              />
              <Board
                title="短衝檢視會議"
                subTitle="Sprint Review"
                role={ROLES.EE}
                classNames="w-[260px] h-[80px]"
              />
              <Board
                title="短衝自省會議"
                subTitle="Sprint Retrospective"
                role={ROLES.EE}
                classNames="w-[260px] h-[80px]"
              />
            </div>
          </div>
        );
      case 0:
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
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
      {renderScene()}
    </div>
  );
}
