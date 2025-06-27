"use client";
import Role, { ROLES } from "@/components/animatedRole";

import styles from "./styles.module.scss";

const ROLE_SCRIPT = [
  { roleName: ROLES.GG, script: "窩的冰淇淋ㄋ？", color: "role-gg" },
  { roleName: ROLES.EE, script: "嗚嗚我會想尼QQ", color: "role-ee" },
  { roleName: ROLES.SM, script: "不愧似窩ㄉ學生", color: "role-sm" },
  { roleName: ROLES.PO, script: "哇喔太厲害ㄌㄅ", color: "primary" },
];
export default function FinishedPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {/* <h1 className="text-4xl font-bold mb-4">結束頁面</h1>
      <p className="text-lg mb-8">感謝您的參與！</p>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">
          您已經完成了所有的任務，期待下次再見！
        </p>
      </div> */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={styles[`star${i + 1}`]}></div>
      ))}
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
