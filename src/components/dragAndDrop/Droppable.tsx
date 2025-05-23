import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DraggableProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function Droppable(props: DraggableProps) {
  const { className, id } = props;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} className={className} style={style}>
      {props.children}
    </div>
  );
}
