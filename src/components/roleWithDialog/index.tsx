import Role, { RoleNameType } from "@/components/animatedRole";
import AnimatedText from "@/components/animatedText";

interface roleWithDialogProps {
  roleName: RoleNameType;
  withAnimation?: boolean;
  text: string;
  textInitialDelay?: number;
  textIntervalDelay?: number;
}

export default function RoleWithDialog({
  roleName,
  withAnimation,
  text,
  textInitialDelay,
  textIntervalDelay,
}: roleWithDialogProps) {
  return (
    <div className="flex">
      <div className="w-1/6 md:w-1/4 sm:w-1/3">
        <Role roleName={roleName} withAnimation={withAnimation} />
      </div>
      <div>
        <AnimatedText
          className="font-bold text-dark"
          text={text}
          initialDelay={textInitialDelay}
          intervalDelay={textIntervalDelay}
        />
      </div>
    </div>
  );
}
