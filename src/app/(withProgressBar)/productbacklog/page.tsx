"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
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
      className="flex items-center border-2 border-primary rounded-2xl p-2 bg-cover-dark text-white text-center w-[350px] h-[80px]"
    >
      <div className="shrink-0 w-[40px] h-[40px] rounded-[50%] bg-cover-primary mr-4 leading-[40px] text-center font-bold">
        {score}
      </div>
      <p className="text-left">{text}</p>
    </Draggable>
  );
}
function DropItem({ id, text, score }: Item) {
  return (
    <Draggable
      id={id}
      className="flex items-center border-2 border-role-ee rounded-2xl p-2 bg-cover-dark text-white text-center w-[350px] h-[80px]"
    >
      <div className="shrink-0 w-[40px] h-[40px] rounded-[50%] bg-cover-roleEE mr-4 leading-[40px] text-center font-bold">
        {score}
      </div>
      <p className="text-left">{text}</p>
    </Draggable>
  );
}
const ITEMS = [
  {
    id: "1",
    text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    score: 8,
  },
  { id: "2", text: "應徵者的線上履歷編輯器", score: 5 },
  { id: "3", text: "會員系統（登入、註冊、權限管理）", score: 13 },
  { id: "4", text: "前台職缺列表、應徵", score: 8 },
];
function DragAndDrop({ onClick }: { onClick: (index: number) => void }) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [leftItems, setLeftItems] = useState(ITEMS);
  const [rightItems, setRightItems] = useState<Item[]>([]);
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);

  const totalScore = rightItems.reduce((acc, item) => acc + item.score, 0);
  const isComplete = totalScore <= 20 && totalScore > 0;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
            className="flex-1 flex flex-col gap-2 border border-primary h-[500px] p-5 bg-(image:--linear-primary)"
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
            className="flex-1 flex flex-col gap-2 border border-role-ee h-[500px] p-5 bg-(image:--linear-role-ee)"
          >
            <SortableContext items={rightItems}>
              {rightItems.map((item) => (
                <SortableItem key={item.id} id={item.id} useStyle={false}>
                  <DropItem key={item.id} {...item} />
                </SortableItem>
              ))}
            </SortableContext>
          </Droppable>
          <DragOverlay>
            {draggingItem ? <DragItem {...draggingItem} /> : null}
          </DragOverlay>
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

  function handleDragStart(event: any) {
    const item = [...leftItems, ...rightItems].find(
      (i) => i.id === event.active.id
    );
    if (item) setDraggingItem(item);
  }
  function handleDragEnd(event: any) {
    setDraggingItem(null);
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
  const [currentIndex, setCurrentIndex] = useState(0);

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
              開始 Sprint
            </Button.Primary>
          </div>
        );
      case 1:
        return <DragAndDrop onClick={setCurrentIndex} />;
      case 2:
        return (
          <div className="flex-1 text-center  w-full bg-linear-(--linear-cover) shadow-[0px_-10px_20px_rgba(10,13,20,0.20),0px_10px_10px_rgba(10,13,20,0.60)]">
            <div className="h-[100px]" />
            <Button.Secondary>點擊畫面任意處繼續</Button.Secondary>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!animationDone) return;
      console.log("go page");
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
      <div className="flex items-start p-10">
        <RoleWithDialog
          roleName={ROLES.GG}
          text={LINES}
          textInitialDelay={1.2}
          textIntervalDelay={0.1}
          direction={DIRECTIONS.RIGHT}
          reverse
          onAnimationDone={() => {
            console.log("animation done");
            setAnimationDone(true);
          }}
          onFinish={() => {
            console.log("動畫結束");
            // setAnimationDone(true);
          }}
          currentIndex={currentIndex}
        />
        {currentIndex === 0 && (
          <div className="w-[280px] rotate-180 ml-4">
            <Role roleName={ROLES.EE} />
          </div>
        )}
      </div>
      {renderContent()}
    </div>
  );
}
