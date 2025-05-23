import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const { className, id } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      className={className}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
