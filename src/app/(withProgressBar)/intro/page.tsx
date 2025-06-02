"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import DragAndDrop, { Droppable, Draggable } from "@/components/dragAndDrop";
import DragAndDropSample from "@/components/dragAndDrop/index.sample";

const dragItems = ["甲", "乙", "丙"];
const LEFT_AREA = "leftArea";
const RIGHT_AREA = "rightArea";
const DraggableMarkup = ({ id }: { id: string }) => (
  <Draggable id={id} className="p-2 border border-primary">
    Drag me {id}
  </Draggable>
);

export default function IntroPage() {
  const [isVisible, setIsVisible] = useState(true);

  // about drag and drop
  const [leftItems, setLeftItems] = useState<string[]>(dragItems);
  const [rightItems, setRightItems] = useState<string[]>([]);

  const handleDragEnd = (event: any) => {
    console.log("event", event);
    const { over, active } = event;

    if (over.id === RIGHT_AREA) {
      setLeftItems((prev) => prev.filter((item) => item !== active.id));
      setRightItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }
    if (over.id === LEFT_AREA) {
      setRightItems((prev) => prev.filter((item) => item !== active.id));
      setLeftItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }
  };

  return (
    <>
      <RoleWithDialog
        roleName={ROLES.PO}
        text="\ 碰 / 我是短衝小精靈，開發 A 組的 PO。PO 也就是產品負責人（Product Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （Product Backlog） 唷 ！"
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.LEFT}
        reverse
        onAnimationDone={() => {
          alert("animated done");
        }}
      />
    </>
  );
}
