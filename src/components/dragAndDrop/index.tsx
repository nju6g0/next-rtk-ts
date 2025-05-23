import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
interface DragAndDropProps {
  children: React.ReactNode;
  onDragEnd: (event: any) => void;
}
export default function DragAndDrop({ children, onDragEnd }: DragAndDropProps) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}

export { Droppable } from "./Droppable";
export { Draggable } from "./Draggable";
