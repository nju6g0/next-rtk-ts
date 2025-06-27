"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Role, { ROLES } from "@/components/animatedRole";
import logo from "../../../../public/logo_txt.png";
import styles from "./styles.module.scss";
import { use } from "react";

const ROLE_SCRIPT = [
  { roleName: ROLES.GG, script: "窩的冰淇淋ㄋ？", color: "role-gg" },
  { roleName: ROLES.EE, script: "嗚嗚我會想尼QQ", color: "role-ee" },
  { roleName: ROLES.SM, script: "不愧似窩ㄉ學生", color: "role-sm" },
  { roleName: ROLES.PO, script: "哇喔太厲害ㄌㄅ", color: "primary" },
];
export default function FinishedPage() {
  const router = useRouter();
  const handleReStart = () => {
    router.push("/");
  };
  return (
    <div className="flex-1 flex flex-col gap-5 items-center justify-center">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={styles[`star${i + 1}`]}></div>
      ))}
      <Image
        src={logo.src}
        // className="m-auto"
        alt="logo"
        width={logo.width}
        height={logo.height}
      />
      <p className="text-3xl font-bold">恭喜你通過</p>
      <h3 className="text-primary text-3xl font-bold border-3 leading-24 w-[600px] text-center rounded-4xl shadow-(--shadow-primary)">
        《 敏捷任務 - 最初の試煉 》
      </h3>
      <span className="text-primary" onClick={handleReStart}>
        再玩一次
      </span>
      <div className="flex gap-4">
        {ROLE_SCRIPT.map((role, index) => (
          <div
            key={role.roleName}
            className={`w-[200px] h-[200px] origin-bottom duration-300 ${styles.role}`}
          >
            <p className={`text-center text-lg text-bold text-${role.color}`}>
              {role.script}
            </p>
            <div className="origin-bottom duration-300 mt-4">
              <Role roleName={role.roleName} initialDelay={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
