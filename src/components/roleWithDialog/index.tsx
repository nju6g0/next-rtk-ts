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
  text: string;
  textInitialDelay?: number;
  textIntervalDelay?: number;
  direction?: DirectionType;
  reverse?: boolean;
}

export default function RoleWithDialog({
  roleName,
  withAnimation,
  text,
  textInitialDelay,
  textIntervalDelay,
  direction,
  reverse = false,
}: roleWithDialogProps) {
  return (
    <div
      className={`flex items-end ${direction === DIRECTIONS[RIGHT] && "flex-row-reverse"}`}
    >
      <div
        className={`md:w-1/6 w-1/4 shrink-0 ${reverse && "rotate-180"} ${direction === DIRECTIONS[RIGHT] ? "ml-[20px]" : "mr-[20px]"}`}
      >
        <Role roleName={roleName} withAnimation={withAnimation} />
      </div>
      <div
        className={`relative grow py-[10px] px-[12px] md:pt-[20px] md:pb-[40px] md:pl-[70px] md:pr-[50px] border rounded-2xl ${roleBorderColors[roleName]}`}
      >
        <AnimatedText
          className="font-bold text-dark text-2xl"
          text={text}
          initialDelay={textInitialDelay}
          intervalDelay={textIntervalDelay}
        />
        <span
          className={`absolute inline-block font-bold px-[16px] py-[4px] top-[20px] left-[-6px] ${roleBgColors[roleName]}`}
        >
          {roleName}
        </span>
      </div>
    </div>
  );
}
