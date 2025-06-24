"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
import { Droppable, Draggable, SortableItem } from "@/components/dragAndDrop";

interface Item {
  id: string;
  text: string;
  score: number;
}
function DragItem({ id, text, score }: Item) {
  return (
    <Draggable
      id={id}
      className="border-2 border-primary rounded-lg p-2 bg-cover-dark text-white text-center"
    >
      {text} score: {score}
    </Draggable>
  );
}
function DropItem({ id, text, score }: Item) {
  return (
    <Draggable
      id={id}
      className="border-2 border-role-ee rounded-lg p-2 bg-cover-dark text-white text-center w-full"
    >
      {text} score: {score}
    </Draggable>
  );
}
const ITEMS = [
  { id: "甲", text: "甲", score: 1 },
  { id: "乙", text: "乙", score: 5 },
  { id: "丙", text: "丙", score: 8 },
  { id: "丁", text: "丁", score: 15 },
];
function DragAndDrop({ onClick }: { onClick: (index: number) => void }) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [leftItems, setLeftItems] = useState(ITEMS);
  const [rightItems, setRightItems] = useState<Item[]>([]);

  const totalScore = rightItems.reduce((acc, item) => acc + item.score, 0);
  const isComplete = totalScore <= 20 && totalScore > 0;
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex items-end gap-10 p-10">
        <div className="w-[400px] flex flex-col border-2 border-primary rounded-4xl overflow-hidden shadow-[10px_10px_0_rgba(0,255,244,0.5),20px_20px_0_rgba(0,255,244,0.2)] h-[500px]">
          <div className="bg-primary">
            <p className="text-2xl text-dark text-center font-bold pt-[20px]">
              產品待辦清單
            </p>
            <p className="text-primary-100 text-base text-center pb-[20px]">
              Product Backlog
            </p>
          </div>
          <Droppable
            id="leftArea"
            className="flex-1 flex flex-col border border-primary h-[500px] p-5 bg-(image:--linear-primary)"
          >
            {leftItems.map((item) => (
              <DragItem key={item.id} {...item} />
            ))}
          </Droppable>
        </div>
        <div className="w-[400px] flex flex-col border-2 border-role-ee rounded-4xl overflow-hidden shadow-[10px_10px_0_rgba(255,199,0,0.5),20px_20px_0_rgba(255,199,0,0.2)] h-[500px]">
          <div className="bg-role-ee">
            <p className="text-2xl text-dark text-center font-bold pt-[20px]">
              開發A組的短衝待辦清單
            </p>
            <p className="text-primary-100 text-base text-center pb-[20px]">
              Sprint Backlog
            </p>
          </div>
          <Droppable
            id="rightArea"
            className="flex-1 flex flex-col border border-role-ee h-[500px] p-5 bg-(image:--linear-role-ee)"
          >
            <SortableContext items={rightItems}>
              {rightItems.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  <DropItem key={item.id} {...item} />
                </SortableItem>
              ))}
            </SortableContext>
          </Droppable>
        </div>
        <Button.Primary
          type={BUTTON_TYPES.BUTTON}
          disabled={!isComplete}
          onClick={() => {
            onClick(2);
          }}
        >
          我完成了
        </Button.Primary>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over, active } = event;

    const item = ITEMS.find((item) => item.id === active.id)!;
    if (
      over.id === "rightArea" &&
      !rightItems.some((el) => el.id === active.id)
    ) {
      setLeftItems((prev) => prev.filter((item) => item.id !== active.id));
      setRightItems((prev) => [...prev, item]);
      return;
    }
    if (
      over.id === "leftArea" &&
      !leftItems.some((el) => el.id === active.id)
    ) {
      setRightItems((prev) => prev.filter((item) => item.id !== active.id));
      setLeftItems((prev) => [...prev, item]);
      return;
    }
    if (
      rightItems.some((el) => el.id === active.id) &&
      rightItems.some((el) => el.id === over.id) &&
      active.id !== over.id
    ) {
      const oldIndex = rightItems.findIndex((el) => el.id === active.id);
      const newIndex = rightItems.findIndex((el) => el.id === over.id);
      setRightItems(arrayMove(rightItems, oldIndex, newIndex));
      return;
    }
  }
}
export default function ProductBacklog() {
  const LINES = [
    "沒錯，如 EE 說的，我這邊已經把剛剛討論好的點數標上去囉～ 你來練習把任務排到短衝待辦清單吧！",
    "換你來試試看吧 ！ 把 「 產品待辦清單 」 的項目拖進「 開發Ａ組的短衝待辦清單 」 裡吧 ！ 提示：置入兩項以上的 Story ， 點數總和不能超過團隊負擔上限 20 點唷！",
    "噢嗚嗚 ， 太厲害ㄌ ！ 又完成了一關 ！ 還有下一關等著你！",
  ];
  const router = useRouter();
  const [animationDone, setAnimationDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  const renderContent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <div className="flex-1 flex justify-end items-end p-10">
            <Button.Primary
              type={BUTTON_TYPES.BUTTON}
              onClick={() => {
                setCurrentIndex(1);
              }}
            >
              開始練習
            </Button.Primary>
          </div>
        );
      case 1:
        return <DragAndDrop onClick={setCurrentIndex} />;
      case 2:
        return (
          <div className="flex-1 flex justify-center items-center p-10">
            點擊畫面任意處繼續
          </div>
        );
      default:
        return null;
    }
  };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!animationDone) return;
      if (currentIndex >= LINES.length - 1) {
        router.push("/daily");
      }
      setAnimationDone(false);
    },
    [animationDone]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="flex flex-col h-screen">
      {/* <div className="flex items-start p-10">
        <RoleWithDialog
          roleName={ROLES.GG}
          text={LINES}
          textInitialDelay={1.2}
          textIntervalDelay={0.1}
          direction={DIRECTIONS.RIGHT}
          reverse
          onAnimationDone={() => {
          }}
          onFinish={() => {
            console.log("動畫結束");
            setAnimationDone(true);
          }}
          currentIndex={currentIndex}
        />
        {currentIndex === 0 && (
          <div className="w-[280px] rotate-180 ml-4">
            <Role roleName={ROLES.EE} />
          </div>
        )}
      </div> */}
      {renderContent()}
    </div>
  );
}
