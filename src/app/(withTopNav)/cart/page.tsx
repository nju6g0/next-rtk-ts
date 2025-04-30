"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartItems } from "@/lib/features/cart/cartSlice";
import { getAllCartItems, getLoading } from "@/lib/features/cart/cartSelectors";
import { CartItem } from "@/interfaces";

export default function Login() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getAllCartItems);
  const loading = useAppSelector(getLoading);
  console.log(items);
  console.log(loading);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main>
      <h1>我是購物車頁</h1>
      {items.map((item: CartItem) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </main>
  );
}
