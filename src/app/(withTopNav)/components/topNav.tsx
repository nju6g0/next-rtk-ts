"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

import { useAppSelector } from "@/lib/hooks";
import { getTotalQuantity } from "@/lib/features/cart/cartSelectors";

type Route = {
  name: string;
  href: string;
};
const ROUTES: Route[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Cart", href: "/cart" },
  { name: "Products", href: "/products" },
];

interface TopNavProps {}
export function TopNav({}: TopNavProps): JSX.Element {
  const pathname = usePathname(); // 獲取當前頁面路徑
  const cartItemNums = useAppSelector(getTotalQuantity);

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">My Top Navigation</h1>
      <nav className="flex space-x-4">
        {ROUTES.map(({ name, href }) => (
          <Link href={href} key={name}>
            <div
              className={`px-8 py-4 border-b-2 border-white w-full text-right ${
                pathname === href ? "bg-rose-200" : ""
              }`}
            >
              {name}
            </div>
          </Link>
        ))}
      </nav>
      <p>{cartItemNums}</p>
    </header>
  );
}
