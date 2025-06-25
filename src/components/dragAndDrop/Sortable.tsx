import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  useStyle?: boolean;
}
export function SortableItem(props: SortableProps) {
  const { children, id, className, useStyle = true } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...(useStyle ? { style } : {})}
      className={className}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
