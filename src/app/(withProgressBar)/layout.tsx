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
    <main className="w-[1280px] max-w-[100vw] mx-auto">
      <ProgressBar />
      <ScoreBoard />
      {children}
    </main>
  );
}
