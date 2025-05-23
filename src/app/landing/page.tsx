"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { setUser } from "@/lib/features/user/userSlice";
import { getUserName } from "@/lib/features/user/userSelectors";
import { User as UserType } from "@/interfaces";
import { saveUser, loadUsers, clearUsersData } from "@/utils/storage";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
import DragAndDrop, { Droppable, Draggable } from "@/components/dragAndDrop";

const LOAD = "load";
const NEW = "new";
const DEFAULT = "default";
const dragItems = ["甲", "乙", "丙"];
const LEFT_AREA = "leftArea";
const RIGHT_AREA = "rightArea";

const DraggableMarkup = ({ id }: { id: string }) => (
  <Draggable id={id} className="p-2 border border-primary">
    Drag me {id}
  </Draggable>
);

export default function LandingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<string>(DEFAULT);
  const [userName, setUserName] = useState("");
  const [loadData, setLoadData] = useState<UserType[]>([]);
  const user = useAppSelector(getUserName);

  // about drag and drop
  const [leftItems, setLeftItems] = useState<string[]>(dragItems);
  const [rightItems, setRightItems] = useState<string[]>([]);

  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };
  const handleSubmit = async (user: UserType) => {
    if (mode === NEW) {
      saveUser(user);
    }

    dispatch(setUser(user));
    router.replace("/intro");
  };

  const toggleMode = (mode: string) => {
    if (mode === LOAD) {
      const users = loadUsers();
      setLoadData(users);
    }

    setMode(mode);
  };
  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (over.id === RIGHT_AREA) {
      setLeftItems((prev) => prev.filter((item) => item !== active.id));
      setRightItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }
    if (over.id === LEFT_AREA) {
      setRightItems((prev) => prev.filter((item) => item !== active.id));
      setLeftItems((prev) => {
        const newItems = new Set([...prev, active.id]);
        return Array.from(newItems);
      });
      return;
    }
  };

  return (
    <>
      <h1>Welcome to the Landing Page</h1>
      <p className="pt-1">This is the main content of the landing page.</p>
      <DragAndDrop onDragEnd={handleDragEnd}>
        <div className="flex">
          <Droppable
            id={LEFT_AREA}
            className="flex flex-col mr-2 border border-primary h-[500px] w-[200px]"
          >
            {leftItems.map((id) => (
              <DraggableMarkup key={id} id={id} />
            ))}
          </Droppable>
          <Droppable
            id={RIGHT_AREA}
            className="flex flex-col border border-role-ee h-[500px] w-[200px]"
          >
            {rightItems.map((id) => (
              <DraggableMarkup key={id} id={id} />
            ))}
          </Droppable>
        </div>
      </DragAndDrop>
      {/* <Button.Primary
        type={BUTTON_TYPES.BUTTON}
        onClick={loadUsers}
        size={BUTTON_SIZES.SM}
      >
        get storage
      </Button.Primary>
      <br />
      <Button.Default
        type={BUTTON_TYPES.BUTTON}
        onClick={clearUsersData}
        size={BUTTON_SIZES.SM}
      >
        clear storage
      </Button.Default>
      <div className="border border-primary mt-5 p-4">
        {mode === DEFAULT && (
          <>
            <Button.Primary
              type="button"
              className="mr-2"
              onClick={() => {
                toggleMode(NEW);
              }}
            >
              new game
            </Button.Primary>
            <Button.Secondary
              type="button"
              className="mr-2"
              onClick={() => {
                toggleMode(LOAD);
              }}
            >
              load game
            </Button.Secondary>
            <Button type="button" disabled onClick={() => {}}>
              Disabled
            </Button>
          </>
        )}
        {mode === NEW && (
          <>
            <button
              type="button"
              onClick={() => {
                toggleMode(DEFAULT);
              }}
            >
              back
            </button>
            <br />
            <label>
              nickname: <input value={userName} onChange={handleChange} />
            </label>
            <button
              type="button"
              onClick={() => {
                handleSubmit({ userName, score: 10 });
              }}
            >
              submit
            </button>
          </>
        )}
        {mode === LOAD && (
          <>
            <button
              type="button"
              onClick={() => {
                toggleMode(DEFAULT);
              }}
            >
              back
            </button>
            <ul>
              {loadData.length > 0 ? (
                loadData.map((item) => (
                  <li
                    key={item.userName}
                    onClick={() => {
                      handleSubmit(item);
                    }}
                  >
                    {item.userName}/ {item.score}
                  </li>
                ))
              ) : (
                <p>No Data</p>
              )}
            </ul>
          </>
        )}
      </div> */}
    </>
  );
}
