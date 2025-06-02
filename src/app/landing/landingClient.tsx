"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { setUser } from "@/lib/features/user/userSlice";
import { getUserName } from "@/lib/features/user/userSelectors";
import { User as UserType } from "@/interfaces";
import { saveUser, loadUsers, clearUsersData } from "@/utils/storage";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
import leafBgTop from "../../../public/homepage/bg_leafDark_4_t.png";
import leafBgRight from "../../../public/homepage/bg_leafDark_3_r.png";
import leafBgBottom from "../../../public/homepage/bg_leafDark_2_b.png";
import leafBgLeft from "../../../public/homepage/bg_leafDark_1_l.png";

const LOAD = "load";
const NEW = "new";
const INTRO = "intro";

function Intro({
  content,
  onClick,
}: {
  content: string;
  onClick: (mode: string) => void;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to the Game!</h1>
      <p className="mt-2">{content}</p>
      <p className="mt-2">You can start a new game or load a saved game.</p>
      <p className="mt-2">Please select an option to start.</p>
      <div className="mt-4 text-center">
        <Button.Primary
          type="button"
          className="mr-2"
          onClick={() => {
            onClick(NEW);
          }}
        >
          new game
        </Button.Primary>
        <Button.Secondary
          type="button"
          className="mr-2"
          onClick={() => {
            onClick(LOAD);
          }}
        >
          load game
        </Button.Secondary>
      </div>
    </>
  );
}
function NewGame({ onSubmit }: { onSubmit: (user: UserType) => void }) {
  const [userName, setUserName] = useState("");
  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">New Game</h1>
      <p className="mt-2">Enter your nickname to start a new game.</p>
      <div className="mt-2">
        <label>
          nickname:{" "}
          <input
            className="border border-primary rounded-md p-1"
            value={userName}
            onChange={handleChange}
          />
        </label>
        <Button.Primary
          type="button"
          className="ml-2"
          onClick={() => {
            onSubmit({ userName, score: 10 });
          }}
        >
          submit
        </Button.Primary>
      </div>
    </>
  );
}
function LoadGame({
  onSubmit,
  list,
}: {
  onSubmit: (user: UserType) => void;
  list: UserType[];
}) {
  return (
    <>
      <h1 className="text-2xl font-bold">Load Game</h1>
      <p className="mt-2">Select a saved game to continue.</p>
      <ul className="mt-4 list-none">
        {list.length > 0 ? (
          list.map((item) => (
            <li
              key={item.userName}
              onClick={() => {
                onSubmit(item);
              }}
              className="mt-2 cursor-pointer border border-primary hover:bg-primary hover:text-dark py-2 px-5 rounded-3xl transition-colors"
            >
              {item.userName}/ {item.score}
            </li>
          ))
        ) : (
          <p>No Data</p>
        )}
      </ul>
    </>
  );
}

export default function LandingPage({ data }: { data: any }) {
  console.log(data);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<string>(INTRO);
  const [loadData, setLoadData] = useState<UserType[]>([]);

  const user = useAppSelector(getUserName);

  const handleSubmit = async (user: UserType) => {
    if (mode === NEW) {
      saveUser(user);
    }

    dispatch(setUser(user));
    router.push("/intro");
  };

  const toggleMode = (mode: string) => {
    if (mode === LOAD) {
      const users = loadUsers();
      setLoadData(users);
    }

    setMode(mode);
  };

  return (
    <div
      className="flex-1 relative bg-no-repeat flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${leafBgTop.src}), url(${leafBgRight.src}), url(${leafBgBottom.src}), url(${leafBgLeft.src})`,
        backgroundPosition: "top, bottom right, bottom, top left",
        backgroundSize: "auto, 40vw 100vh , auto, 40vw 100vh",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-(--cover-dark)" />
      {/* 
      <Button.Secondary
        className="absolute top-[100px]"
        type={BUTTON_TYPES.BUTTON}
        onClick={clearUsersData}
        size={BUTTON_SIZES.SM}
      >
        clear storage
      </Button.Secondary>*/}

      <div className="relative border border-primary rounded-3xl w-xl p-5 pl-12 pt-20 ring-2 ring-primary shadow-(--shadow-primary)">
        {mode === INTRO && (
          <Intro content={data.content} onClick={toggleMode} />
        )}
        {mode === NEW && <NewGame onSubmit={handleSubmit} />}
        {mode === LOAD && <LoadGame onSubmit={handleSubmit} list={loadData} />}
        <div className="absolute top-3 left-[-12px] border border-primary py-2 px-5 bg-primary text-dark font-bold shadow-(--shadow-primary)">
          {mode === INTRO ? (
            "(謎之音) "
          ) : (
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                toggleMode(INTRO);
              }}
            >
              &lt; back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
