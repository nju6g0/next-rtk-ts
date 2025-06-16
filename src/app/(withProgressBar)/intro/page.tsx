"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
import { Droppable, Draggable, SortableItem } from "@/components/dragAndDrop";
import styles from "./styles.module.scss";

function ListItem({ text, classNames }: { text: string; classNames?: string }) {
  return (
    <div className={`border-2 border-primary p-5 rounded-xl ${classNames}`}>
      {text}
    </div>
  );
}

interface ItemMap {
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  [key: string]: string; // 👈 加上索引簽章，允許 string key
}
const DRAG_ITEMS: ItemMap = {
  item1: "應徵者的線上履歷編輯器",
  item2: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
  item3: "會員系統（登入、註冊、權限管理）",
  item4: "前台職缺列表、應徵",
};
function DNDscene() {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [listItems, setListItems] = useState<string[]>([]);
  const isShow = (key: string) => {
    return !listItems.includes(key);
  };
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex-1 flex gap-10 my-20 mx-auto w-[1100px]">
        <div className="flex flex-col w-[300px]">
          <div className="flex-1">
            {isShow("item1") && (
              <Draggable id="item1">
                <ListItem classNames="mt-20 ml-15" text={DRAG_ITEMS.item1} />
              </Draggable>
            )}
          </div>
          <div className="flex-1">
            {isShow("item2") && (
              <Draggable id="item2">
                <ListItem classNames="mt-20 mr-15" text={DRAG_ITEMS.item2} />
              </Draggable>
            )}
          </div>
        </div>
        <div className="w-[500px] flex flex-col flex-1 border-2 border-primary rounded-4xl overflow-hidden shadow-[10px_10px_0_rgba(0,255,244,0.5),20px_20px_0_rgba(0,255,244,0.2)] h-[500px]">
          <div className="bg-primary">
            <p className="text-2xl text-dark text-center font-bold pt-[20px]">
              產品待辦清單
            </p>
            <p className="text-primary-100 text-base text-center pb-[20px]">
              Product Backlog
            </p>
          </div>
          <div className="p-5 flex-1 flex gap-6 bg-(image:--linear-primary)">
            <div className="flex flex-col items-center">
              <span className="text-white right-[-20px] top-0">高</span>
              <div className="flex-1 w-1 h-full bg-primary rounded-xs" />
              <span className="text-white right-[-20px] bottom-0">低</span>
            </div>
            <div className="flex-1">
              <Droppable id="list">
                <SortableContext items={listItems}>
                  {listItems.map((el, idx) => (
                    <SortableItem key={el + idx} id={el}>
                      <div className="grid place-items-center border-2 border-dashed border-primary h-[80px] rounded-xl mt-2 px-2 text-center">
                        {DRAG_ITEMS[el] || ""}
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
                {Array.from({ length: 4 - listItems.length }, (_s, i) => (
                  <div
                    key={i}
                    className="border-2 border-dashed border-primary h-[80px] rounded-xl mt-2"
                  />
                ))}
              </Droppable>
            </div>
          </div>
        </div>
        <div className="w-[300px]">
          <div className="flex-1">
            {isShow("item3") && (
              <Draggable id="item3">
                <ListItem classNames="mt-30 ml-15" text={DRAG_ITEMS.item3} />
              </Draggable>
            )}
          </div>
          <div className="flex-1">
            {isShow("item4") && (
              <Draggable id="item4">
                <ListItem classNames="mt-50" text={DRAG_ITEMS.item4} />
              </Draggable>
            )}
          </div>
        </div>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    console.log("Drag ended:", event);
    const { over, active } = event;
    if (over.id === "list") {
      setListItems([...listItems, active.id]);
    }
  }
}
export default function IntroPage() {
  const TEXT = [
    "\ 碰 / 我是短衝小精靈，開發 A 組的 PO。PO 也就是產品負責人（Product Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （Product Backlog） 唷 ！",
    "剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了「 產品需求清單 」。 既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！ ",
    "換你來試試看吧！提示：請把需求拖移至產品待辦清單 ， 並調整其優先順序 。",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(3);
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
          <div className="flex-1 flex gap-10 my-20 mx-auto w-[1100px]">
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
            <div className="w-[500px] flex flex-col flex-1 border-2 border-primary rounded-4xl overflow-hidden shadow-[10px_10px_0_rgba(0,255,244,0.5),20px_20px_0_rgba(0,255,244,0.2)] h-[500px]">
              <div className="bg-primary">
                <p className="text-2xl text-dark text-center font-bold pt-[20px]">
                  產品待辦清單
                </p>
                <p className="text-primary-100 text-base text-center pb-[20px]">
                  Product Backlog
                </p>
              </div>
              <div className="p-5 flex-1 flex gap-6 bg-(image:--linear-primary)">
                <div className="flex flex-col items-center">
                  <span className="text-white right-[-20px] top-0 text-dark">
                    高
                  </span>
                  <div className="flex-1 w-1 h-full bg-primary rounded-xs" />
                  <span className="text-white right-[-20px] bottom-0 text-dark">
                    低
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  {Array.from({ length: 4 }, (_s, i) => i).map((el) => (
                    <div
                      key={el}
                      className="border-2 border-dashed border-primary h-[80px] rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[300px] relative">
              <ListItem
                classNames="mt-30 ml-15 opacity-60"
                text="會員系統（登入、註冊、權限管理）"
              />
              <ListItem classNames="mt-50" text="前台職缺列表、應徵" />
              <div className={styles.arrow} />
            </div>
          </div>
        );
      case 3:
        return <DNDscene />;
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
      {/* <RoleWithDialog
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
      /> */}
      {renderScene()}
    </>
  );
}
