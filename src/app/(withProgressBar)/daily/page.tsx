"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Role, { ROLES, RoleNameType } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import { Draggable, Droppable } from "@/components/dragAndDrop";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
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
const DropItem = ({ classNames }: { classNames?: string }) => (
  <div
    className={`border-3 border-dashed border-primary w-[260px] h-[80px] rounded-2xl ${classNames}`}
  />
);
const DAILY = "daily";
const REVIEW = "review";
const RETRO = "retro";
const DRAG_ITEMS = {
  [DAILY]: { id: DAILY, title: "每日站立會議", subTitle: "Daily Scrum" },
  [REVIEW]: { id: REVIEW, title: "短衝檢視會議", subTitle: "Sprint Review" },
  [RETRO]: {
    id: RETRO,
    title: "短衝自省會議",
    subTitle: "Sprint Retrospective",
  },
};
type DropType = typeof DAILY | typeof REVIEW | typeof RETRO;
type DropState = {
  [key in DropType]: DropType | null;
};
const dropIds: DropType[] = [DAILY, REVIEW, RETRO];

function DNDScene({ changeScene }: { changeScene: () => void }) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [dragItems, setDragItems] = useState<DropType[]>([
    DAILY,
    REVIEW,
    RETRO,
  ]);
  const [dropItems, setDropItems] = useState<DropState>({
    [DAILY]: null,
    [REVIEW]: null,
    [RETRO]: null,
  });
  const [pass, setPass] = useState(false);

  const getItem = (id: DropType) => {
    return DRAG_ITEMS[id];
  };
  useEffect(() => {
    const isKeyEqualToValue = Object.entries(dropItems).every(
      ([key, value]) => key === value
    );
    setPass(isKeyEqualToValue);
  }, [dropItems]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className={`bg-contain bg-center bg-no-repeat w-[${processImage.width}px] h-[935px]`}
        style={{
          backgroundImage: `url("${processImage.src}")`,
        }}
      >
        <div className="inline-block pl-[34px] w-[400px] relative h-full border-1 border-primary">
          <div className="h-[150px]" />
          <Board
            title="產品待辦清單"
            subTitle="Product Backlog"
            classNames={`w-[260px] h-[80px] ${styles.twigLeft}`}
          />
          <Board
            title="短衝規劃會議"
            subTitle="Sprint Planning"
            classNames={`w-[260px] h-[80px] mt-5 ${styles.twigLeft}`}
          />
          <Board
            title="短衝待辦清單"
            subTitle="Sprint Backlog"
            classNames={`w-[260px] h-[80px] mt-5 ${styles.twigLeft}`}
          />
          <Board
            title="短衝"
            subTitle="Sprint"
            classNames={`w-[120px] h-[80px] ${styles.twigTop} ${styles.sprint}`}
          />
        </div>
        <div
          className={`inline-block w-[600px] ${styles.dropzone} h-full border-1 border-role-ee`}
        >
          {dropIds.map((id, idx) => (
            <Droppable
              key={id}
              id={id}
              className={`inline-block ${styles[id]} ${idx === 0 ? styles.twigLeft : styles.twigBottom}`}
            >
              {dropItems[id] ? (
                <Draggable id={getItem(dropItems[id]).id}>
                  <Board
                    title={getItem(dropItems[id]).title}
                    subTitle={getItem(dropItems[id]).subTitle}
                    role={
                      id === getItem(dropItems[id]).id ? ROLES.EE : ROLES.GG
                    }
                    classNames="w-[260px] h-[80px]"
                  />
                </Draggable>
              ) : (
                <DropItem />
              )}
            </Droppable>
          ))}
        </div>
        <Droppable
          id="list"
          className="inline-block w-[200px] border-1 border-role-gg text-role-ee"
        >
          <div className="h-[200px]" />
          {dragItems.map((item) => (
            <Draggable key={getItem(item).id} id={getItem(item).id}>
              <Board
                title={getItem(item).title}
                subTitle={getItem(item).subTitle}
                role={ROLES.EE}
                classNames="w-[260px] h-[80px] mt-5"
              />
            </Draggable>
          ))}
        </Droppable>
        <Button.Primary
          type={BUTTON_TYPES.BUTTON}
          onClick={changeScene}
          disabled={!pass}
          className="absolute bottom-30 right-0"
        >
          我完成了
        </Button.Primary>
      </div>
    </DndContext>
  );
  function handleDragEnd(event: any) {
    const { over, active } = event;
    const entry = Object.entries(dropItems).find(
      ([_, value]) => value === active.id
    );
    if (dropIds.includes(over.id)) {
      setDropItems((prev) =>
        entry
          ? { ...prev, [over.id]: active.id, [entry[0]]: null }
          : { ...prev, [over.id]: active.id }
      );
      setDragItems((prev) => {
        const key = over.id as DropType;
        const item = dropItems[key];
        const newDragItems = prev.filter((item) => item !== active.id);
        if (item) {
          newDragItems.push(item);
        }
        return newDragItems;
      });
      return;
    }
    if (over.id === "list") {
      if (!dragItems.includes(active.id)) {
        setDragItems((prev) => [...prev, active.id]);
      }
      if (entry) {
        setDropItems((prev) => ({ ...prev, [entry[0]]: null }));
      }
      return;
    }
  }
}
const LINES = [
  "等等等等等 ， 你都還不知道什麼是 Sprint 吧 ！ 讓我先為你介紹一下～仔細聽好唷 ， 等等會考考你 ！",
  "Sprint 是一個短衝 ， 開發團隊會在這期間執行開發 。 在這段期間內 ， 開發團隊舉辦每日站立會議 (Daily Scrum) ， 追蹤成員間的工作狀況 ， 在 Sprint 的結束也會包含短衝檢視會議 (Sprint Review) 以及短衝自省會議 (Sprint Retrospective)",
  "換你來試試看吧 ！ 在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？",
  "哼哼沒想到你這麼快就學會惹 ， 快結束了加油加油 ！",
];
export default function Daily() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(2);
  const [animationDone, setAnimationDone] = useState(false);
  const [showList, setShowList] = useState(false);

  const handleAnimationDone = () => {
    setAnimationDone(true);
    if (currentIndex === 1) {
      setShowList(true);
    }
  };
  const goNextScene = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setAnimationDone(false);
  };

  const handleClick = useCallback(() => {
    if (!animationDone || currentIndex === 2) return;
    if (currentIndex >= LINES.length - 1) {
      router.push("/retro");
      return;
    }

    setCurrentIndex((prevIndex) => {
      if (prevIndex >= LINES.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
    setAnimationDone(false);
  }, [animationDone, currentIndex]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderScene = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className="flex-1 flex justify-center gap-5 p-10">
            <div>
              <Image
                src={dailyImage.src}
                alt="clock"
                width={dailyImage.width}
                height={dailyImage.height}
              />
              <Board
                title="每日站立會議"
                subTitle="Daily Scrum"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-6 text-xl leading-8">
                  每天都要進行的會議 ， 以15分鐘為限制
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "0.5s" }}
                  >
                    昨天為團隊的短衝目標 (Sprint Goal)做了那些進度
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "1s" }}
                  >
                    今天我會如何準備來幫助團隊達到短衝目標
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "1.5s" }}
                  >
                    今天我會如何準備來幫助團隊達到短衝目標
                  </li>
                  <p
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "2s" }}
                  >
                    透過團隊分享 ， 追蹤大家的工作狀況。
                  </p>
                </ul>
              )}
            </div>
            <div>
              <Image
                src={reviewImage.src}
                alt="clock"
                width={reviewImage.width}
                height={reviewImage.height}
              />
              <Board
                title="短衝檢視會議"
                subTitle="Sprint Review"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-6 text-xl leading-8">
                  <p
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "2.5s" }}
                  >
                    用來檢視該次短衝增量的成果 ， 以蒐集相關的回饋數據或意見 。
                  </p>
                </ul>
              )}
            </div>
            <div>
              <Image
                src={retroImage.src}
                alt="clock"
                width={retroImage.width}
                height={retroImage.height}
              />
              <Board
                title="短衝自省會議"
                subTitle="Sprint Retrospective"
                role={ROLES.EE}
              />
              {showList && (
                <ul className="list-disc pl-5 mt-6 text-xl leading-8">
                  <p
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "3s" }}
                  >
                    團隊在自省會議裡 , 會共同回顧該短衝歷程發生的事情
                  </p>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "3.5s" }}
                  >
                    好的地方
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "4s" }}
                  >
                    可以改進的地方
                  </li>
                  <li
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "4.5s" }}
                  >
                    如何維持我們已有的成功經驗
                  </li>
                  <p
                    className={`${styles.animaSlideDown}`}
                    style={{ animationDelay: "5s" }}
                  >
                    優化工作流程、讓團隊有變得更好的機會。
                  </p>
                </ul>
              )}
            </div>
          </div>
        );
      case 2:
        return <DNDScene changeScene={goNextScene} />;
      case 3:
        return (
          <div className="flex-1 text-center  w-full h-full bg-linear-(--linear-cover) shadow-[0px_-10px_20px_rgba(10,13,20,0.20),0px_10px_10px_rgba(10,13,20,0.60)]">
            <div className="h-[100px]" />
            <Button.Secondary>點擊畫面任意處繼續</Button.Secondary>
          </div>
        );
      case 0:
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-5">
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
