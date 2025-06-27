"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Role, { ROLES, RoleNameType } from "@/components/animatedRole";
import RoleWithDialog, { DIRECTIONS } from "@/components/roleWithDialog";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";

const LINES: string[] = [
  "今天的工作進展如何？",
  "有什麼需要幫忙的嗎？",
  "我們可以一起討論一下。",
];
const CORRECT = "correct";
const INCORRECT = "incorrect";
export default function RetroPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);
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
      router.push("/ending");
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
          <div className="flex-1 flex gap-25 py-10 w-[900px] m-auto">
            <div>
              <p className="bg-primary text-center py-2 text-dark text-xl font-bold">
                我是一段文字
              </p>
              <div className="flex-1 flex gap-10 mt-5">
                <div
                  className="flex flex-col gap-5 items-center"
                  onClick={() => {
                    handleClickRadio(1, CORRECT);
                  }}
                >
                  <Role roleName={ROLES.SM} withAnimation={false} />
                  <Button.Radio checked={radioValues[1] === CORRECT} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae deserunt ipsum voluptate, nesciunt libero
                    mollitia. Quis consequatur eius corporis incidunt?
                  </p>
                </div>
                <div
                  className="flex flex-col gap-5 items-center"
                  onClick={() => {
                    handleClickRadio(1, INCORRECT);
                  }}
                >
                  <Role roleName={ROLES.PO} withAnimation={false} />
                  <Button.Radio checked={radioValues[1] === INCORRECT} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae deserunt ipsum voluptate, nesciunt libero
                    mollitia. Quis consequatur eius corporis incidunt?
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="bg-primary text-center py-2 text-dark text-xl font-bold">
                我是一段文字
              </p>
              <div className="flex-1 flex gap-10 mt-5">
                <div
                  className="flex flex-col gap-5 items-center"
                  onClick={() => {
                    handleClickRadio(2, CORRECT);
                  }}
                >
                  <Role roleName={ROLES.EE} withAnimation={false} />
                  <Button.Radio checked={radioValues[2] === CORRECT} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae deserunt ipsum voluptate, nesciunt libero
                    mollitia. Quis consequatur eius corporis incidunt?
                  </p>
                </div>
                <div
                  className="flex flex-col gap-5 items-center"
                  onClick={() => {
                    handleClickRadio(2, INCORRECT);
                  }}
                >
                  <Role roleName={ROLES.GG} withAnimation={false} />
                  <Button.Radio checked={radioValues[2] === INCORRECT} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae deserunt ipsum voluptate, nesciunt libero
                    mollitia. Quis consequatur eius corporis incidunt?
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
