"use client";
import { useState, useEffect } from "react";

import Role, { ROLES } from "@/components/animatedRole";

export default function LaunchPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Launch Page</h1>
      <p className="text-lg">This is the launch page of the application.</p>
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
    </div>
  );
}
