"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { getUserName, getUserScore } from "@/lib/features/user/userSelectors";

import ProgressBar from "./components/progressBar";
import ScoreBoard from "./components/scoreBoard";

export default function ProgressBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const userName = useAppSelector(getUserName);

  // useEffect(() => {
  //   if (!userName) {
  //     console.log("no user");
  //     router.replace("/");
  //   }
  // }, [userName]);

  // if (!userName) return <div>loading...</div>;
  return (
    <div className="relative flex-1 flex flex-col  w-[1280px] mx-auto py-4 border border-primary">
      <ProgressBar />
      <ScoreBoard />
      {children}
    </div>
  );
}
