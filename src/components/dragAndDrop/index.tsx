import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function DragAndDrop() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">
      <div className="border border-primary-200 p-2">Drag me</div>
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="border border-primary-200 p-2 w-[200px]">
          {parent === null ? draggableMarkup : null}
        </div>
        <div className="border border-primary-200 p-2 w-[200px]">
          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              {parent === id ? (
                draggableMarkup
              ) : (
                <div className="border border-primary-200 p-2">"Drop here"</div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
