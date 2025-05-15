"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { setUser } from "@/lib/features/user/userSlice";
import { getUserName } from "@/lib/features/user/userSelectors";
import { User as UserType } from "@/interfaces";
import { saveUser, loadUsers, clearUsersData } from "@/utils/storage";

const USERS = "users";
const LOAD = "load";
const NEW = "new";
const DEFAULT = "default";
export default function LandingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<string>(DEFAULT);
  const [userName, setUserName] = useState("");
  const [loadData, setLoadData] = useState<UserType[]>([]);
  const user = useAppSelector(getUserName);

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

  return (
    <>
      <h1>Welcome to the Landing Page</h1>
      <p>This is the main content of the landing page.</p>
      <button type="button" onClick={loadUsers}>
        get storage
      </button>
      <br />
      <button type="button" onClick={clearUsersData}>
        clear storage
      </button>
      <div className="border border-primary">
        {mode === DEFAULT && (
          <>
            <button
              type="button"
              onClick={() => {
                toggleMode(NEW);
              }}
            >
              new game
            </button>
            <br />
            <button
              type="button"
              onClick={() => {
                toggleMode(LOAD);
              }}
            >
              load game
            </button>
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
      </div>
    </>
  );
}
