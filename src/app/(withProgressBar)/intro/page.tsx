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
      <h3>This is Intro Page!!</h3>
      <DragAndDropSample />
      <DragAndDrop onDragEnd={handleDragEnd}>
        <div className="flex">
          <Droppable
            id={LEFT_AREA}
            className="flex flex-col mr-2 border border-primary h-[500px] w-[200px]"
          >
            {leftItems.map((id) => (
              <DraggableMarkup key={id} id={id} />
            ))}
          </Droppable>
          <Droppable
            id={RIGHT_AREA}
            className="flex flex-col border border-role-ee h-[500px] w-[200px]"
          >
            {rightItems.map((id) => (
              <DraggableMarkup key={id} id={id} />
            ))}
          </Droppable>
        </div>
      </DragAndDrop>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        click me
      </button>
      {isVisible && (
        <AnimatedText
          className="font-bold text-dark"
          text="你好，這是一段會動的文字。文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字"
          initialDelay={1.2}
          intervalDelay={0.1}
        />
      )}
      {/* <RoleWithDialog
        roleName={ROLES.EE}
        text="你好，這是一段會動的文字。文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字。"
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.RIGHT}
        reverse
      />
      <div style={{ width: "100px", height: "100px" }}>
        <Role roleName={ROLES.EE} />
      </div>
      <div style={{ width: "100px", height: "100px" }}>
        <Role withAnimation={false} />
      </div> */}
    </>
  );
}
