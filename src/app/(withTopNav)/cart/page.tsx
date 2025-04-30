"use client";
import { useDispatch, useSelector } from "react-redux";

import { getAllCartItems } from "@/lib/features/cart/cartSelectors";

export default function Login() {
  const dispatch = useDispatch();
  const items = useSelector(getAllCartItems);
  console.log(items);

  return (
    <main>
      <h1>我是購物車頁</h1>
    </main>
  );
}
