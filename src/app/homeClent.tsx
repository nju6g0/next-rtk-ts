"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import Role, { ROLES } from "@/components/animatedRole";

function Launch({ progress }: { progress: number }) {
  return (
    <>
      <div className="mt-8 flex gap-2">
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.EE} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.GG} initialDelay={0.8} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.PO} initialDelay={1.4} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.SM} initialDelay={1.8} />
        </div>
      </div>
      <div className="w-4xl h-[8px] rounded-sm overflow-hidden">
        <div
          className="bg-primary h-[8px]"
          style={{ width: `${progress}%`, transition: "0.5s" }}
        />
      </div>
    </>
  );
}
function Intro() {
  return (
    <>
      <h1>Welcome to the home Page</h1>
      <p>This is the main content of the home page.</p>
      <Link href="/landing">Landing Page</Link>
    </>
  );
}

export default function HomeClient({ data }: { data: any }) {
  console.log(data);
  const [progress, setProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.min(100 - prev, Math.pow(prev / 10, 1.5) + 1);
        return prev + increment;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress >= 100) {
        setIsLaunching(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLaunching ? <Launch progress={progress} /> : <Intro />}
    </div>
  );
}
