"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Role, { ROLES } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";

const LINES: string[] = [
  "嗚啊啊新來的 ， 你真的很幸運 ， 今天剛好是開發 B 組的 Retro ，你也來見識一下 ， 看看 Retro 都該做些什麼吧～～",
  " 我們會在會議裡請團隊成員提出哪些是做得好的地方 、 哪些可以繼續改善的地方？ 並記錄再 Confluence 中 。 Retro 重點在於<span>「正面表述」</span>，你也思考看看 ， 哪一些是適合 Retro 的回饋呢 ？",
  "太酷ㄌ吧 ， 根本天才 ， 畢業之後不要忘記我唷!",
];
const CORRECT = "correct";
const INCORRECT = "incorrect";
export default function RetroPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [pass, setPass] = useState(false);
  const [radioValues, setRadioValues] = useState({
    1: null,
    2: null,
  });

  const handleClickRadio = (index: number, answer: string) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [index]: answer,
    }));
  };
  useEffect(() => {
    const allPassed = Object.values(radioValues).every(
      (value) => value === CORRECT
    );
    setPass(allPassed);
  }, [radioValues]);

  const handleAnimationDone = () => {
    setAnimationDone(true);
  };

  const handleClick = useCallback(() => {
    if (!animationDone || currentIndex === 1) return;
    if (currentIndex >= LINES.length - 1) {
      router.push("/finished");
      return;
    }

    setCurrentIndex((prevIndex) => {
      if (prevIndex >= LINES.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
    setAnimationDone(false);
  }, [animationDone, currentIndex]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  const renderScene = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className="flex-1 flex gap-25 py-10 justify-center">
            <div>
              <p className="bg-primary text-center py-2 text-dark text-xl font-bold">
                Q1.做得好的地方?
              </p>
              <div className="flex-1 flex gap-10 mt-5">
                <div
                  className="flex flex-col gap-5 items-center w-[200px]"
                  onClick={() => {
                    handleClickRadio(1, INCORRECT);
                  }}
                >
                  <Role roleName={ROLES.SM} withAnimation={false} />
                  <Button.Radio checked={radioValues[1] === INCORRECT} />
                  <p className="border-2 border-primary p-4 rounded-2xl">
                    這次我幫了很多人救火耶～
                  </p>
                </div>
                <div
                  className="flex flex-col gap-5 items-center w-[200px]"
                  onClick={() => {
                    handleClickRadio(1, CORRECT);
                  }}
                >
                  <Role roleName={ROLES.PO} withAnimation={false} />
                  <Button.Radio checked={radioValues[1] === CORRECT} />
                  <p className="border-2 border-primary p-4 rounded-2xl">
                    大家在開發上都會互相 cover ， 讓任務都有準在時間內完成 。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="bg-primary text-center py-2 text-dark text-xl font-bold">
                Q2.有哪些可以做得更好？
              </p>
              <div className="flex-1 flex gap-10 mt-5">
                <div
                  className="flex flex-col gap-5 items-center w-[200px]"
                  onClick={() => {
                    handleClickRadio(2, CORRECT);
                  }}
                >
                  <Role roleName={ROLES.EE} withAnimation={false} />
                  <Button.Radio checked={radioValues[2] === CORRECT} />
                  <p className="border-2 border-primary p-4 rounded-2xl">
                    可以記錄這次的開發時間 ， 讓預估團隊點數可以更精準 。
                  </p>
                </div>
                <div
                  className="flex flex-col gap-5 items-center w-[200px]"
                  onClick={() => {
                    handleClickRadio(2, INCORRECT);
                  }}
                >
                  <Role roleName={ROLES.GG} withAnimation={false} />
                  <Button.Radio checked={radioValues[2] === INCORRECT} />
                  <p className="border-2 border-primary p-4 rounded-2xl">
                    開發時間預估不準確 ， 請後端下次改進 ， 避免 delay 到我 。
                  </p>
                </div>
              </div>
            </div>

            <Button.Primary
              type={BUTTON_TYPES.BUTTON}
              onClick={() => {
                setCurrentIndex(2);
                setAnimationDone(false);
              }}
              disabled={!pass}
              className="absolute bottom-40 right-0"
            >
              我完成了
            </Button.Primary>
          </div>
        );
      case 2:
        return (
          <div className="flex-1 text-center  w-full h-full bg-linear-(--linear-cover) shadow-[0px_-10px_20px_rgba(10,13,20,0.20),0px_10px_10px_rgba(10,13,20,0.60)]">
            <div className="h-[100px]" />
            <Button.Fake>點擊畫面任意處繼續</Button.Fake>
          </div>
        );
      case 0:
      default:
        return null;
    }
  };
  return (
    <div className="flex-1 flex flex-col gap-5">
      <RoleWithDialog
        roleName={ROLES.GG}
        text={LINES}
        textInitialDelay={1.2}
        textIntervalDelay={0.1}
        direction={DIRECTIONS.RIGHT}
        reverse
        onAnimationDone={handleAnimationDone}
        onFinish={() => {}}
        currentIndex={currentIndex}
      />
      {renderScene()}
    </div>
  );
}
