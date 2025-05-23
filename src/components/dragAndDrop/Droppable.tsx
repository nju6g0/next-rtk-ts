import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
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
