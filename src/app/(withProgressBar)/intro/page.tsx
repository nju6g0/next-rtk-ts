"use client";
import React, { useState } from "react";

import AnimatedText from "@/components/animatedText";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";

export default function IntroPage() {
  return (
    <>
      <RoleWithDialog
        roleName={ROLES.PO}
        // text="\ 碰 / 我是短衝小精靈，開發 A 組的 PO。PO 也就是產品負責人（Product Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （Product Backlog） 唷 ！"
        text={["我是第一段文字", "會有動畫效果", "最後播完會有箭頭"]}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.LEFT}
        reverse
        onAnimationDone={(index, text) => {
          console.log(index, text);
        }}
        onFinish={() => {
          console.log("動畫結束");
        }}
      />
    </>
  );
}
