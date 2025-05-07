"use client";
import { useEffect } from "react";

import { useAppSelector } from "@/lib/hooks";
import { getAuth } from "@/lib/features/auth/authSelectors";
import { TopNav } from "./components/topNav";
import { Footer } from "./components/footer";

export default function TopNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAuth = useAppSelector(getAuth);
  console.log("auth", hasAuth);

  useEffect(() => {
    if (!hasAuth) {
      window.location.href = "/login";
    }
  }, [hasAuth]);

  if (!hasAuth) return <h1>請先取得通關密碼</h1>;
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
