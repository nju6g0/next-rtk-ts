import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

// const containers = ["A", "B", "C"];
const dragItems = ["甲", "乙", "丙"];
export default function DragAndDrop() {
  // const [parent, setParent] = useState(null);
  const [leftItems, setLeftItems] = useState<string[]>(dragItems);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const DraggableMarkup = ({ id }: { id: string }) => (
    <Draggable id={id} className="p-2 border border-primary">
      Drag me {id}
    </Draggable>
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex">
        {/* <div className="p-2 border mr-2">
          {parent === null ? draggableMarkup : null}
        </div> */}
        {/* <div className="p-2 border">
          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id} className="p-2 border border-role-ee">
              {parent === id ? draggableMarkup : "Drop here"}
            </Droppable>
          ))}
        </div> */}
        <Droppable
          id="leftArea"
          className="flex flex-col mr-2 border border-primary h-[500px] w-[200px]"
        >
          {leftItems.map((id) => (
            <DraggableMarkup key={id} id={id} />
          ))}
        </Droppable>
        <Droppable
          id="rightArea"
          className="flex flex-col border border-role-ee h-[500px] w-[200px]"
        >
          {rightItems.map((id) => (
            <DraggableMarkup key={id} id={id} />
          ))}
        </Droppable>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over, active } = event;
    console.log("event", event);

    if (over.id === "rightArea") {
      setLeftItems((prev) => prev.filter((item) => item !== active.id));
      setRightItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }
    if (over.id === "leftArea") {
      setRightItems((prev) => prev.filter((item) => item !== active.id));
      setLeftItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    // setParent(over ? over.id : null);
  }
}
