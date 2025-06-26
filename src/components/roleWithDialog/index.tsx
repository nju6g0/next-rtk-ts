import Role, { RoleNameType, ROLES } from "@/components/animatedRole";
import AnimatedText from "@/components/animatedText";

const roleBgColors = {
  [ROLES.EE]: "bg-role-ee",
  [ROLES.GG]: "bg-role-gg",
  [ROLES.PO]: "bg-primary",
  [ROLES.SM]: "bg-role-sm",
};
const roleBorderColors = {
  [ROLES.EE]: "border-role-ee",
  [ROLES.GG]: "border-role-gg",
  [ROLES.PO]: "border-primary",
  [ROLES.SM]: "border-role-sm",
};
const roleShadow = {
  [ROLES.EE]: "shadow-(--shadow-role-ee)",
  [ROLES.GG]: "shadow-(--shadow-role-gg)",
  [ROLES.PO]: "shadow-(--shadow-primary)",
  [ROLES.SM]: "shadow-(--shadow-role-sm)",
};

const LEFT = "LEFT";
const RIGHT = "RIGHT";
export const DIRECTIONS = {
  [LEFT]: LEFT,
  [RIGHT]: RIGHT,
} as const;
export type DirectionType = keyof typeof DIRECTIONS;

interface roleWithDialogProps {
  roleName: RoleNameType;
  withAnimation?: boolean;
  text: string[];
  textInitialDelay?: number;
  textIntervalDelay?: number;
  direction?: DirectionType;
  reverse?: boolean;
  currentIndex: number;
  onAnimationDone?: (index: number, text: string) => void;
  onFinish?: () => void;
}

export default function RoleWithDialog({
  roleName,
  withAnimation,
  text,
  textInitialDelay,
  textIntervalDelay,
  direction,
  reverse = false,
  currentIndex,
  onAnimationDone,
  onFinish,
}: roleWithDialogProps) {
  return (
    <div
      className={`flex ${direction === DIRECTIONS[RIGHT] && "flex-row-reverse"}`}
    >
      <div
        className={`shrink-0 w-[180px] ${reverse && "rotate-180"} ${direction === DIRECTIONS[RIGHT] ? "ml-5" : "mr-5"}`}
      >
        {/* <Role roleName={roleName} withAnimation={withAnimation} /> */}
      </div>
      <div
        className={`relative grow py-2 px-3 md:pt-5 md:pb-8 md:pl-20 md:pr-12 border rounded-2xl ${roleBorderColors[roleName]} ${roleShadow[roleName]} bg-(--cover-dark)`}
      >
        <AnimatedText
          className="text-2xl"
          text={text}
          initialDelay={textInitialDelay}
          intervalDelay={textIntervalDelay}
          roleName={roleName}
          onAnimationDone={onAnimationDone}
          onFinish={onFinish}
          currentIndex={currentIndex}
        />
        <span
          className={`absolute inline-block text-dark font-bold px-4 py-1 top-5 left-[-6px] ${roleBgColors[roleName]}`}
        >
          {roleName}
        </span>
      </div>
    </div>
  );
}
