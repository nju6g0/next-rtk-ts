"use client";

import { useAppSelector } from "@/lib/hooks";
import { getUserName, getUserScore } from "@/lib/features/user/userSelectors";

export default function ScoreBoard() {
  const name = useAppSelector(getUserName);
  const score = useAppSelector(getUserScore);

  return (
    <div className="fixed top-0 right-0 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Score</h1>
      <p className="text-lg">{`user name: ${name}`}</p>
      <p className="text-lg">{`Your score is: ${score}`}</p>
    </div>
  );
}
