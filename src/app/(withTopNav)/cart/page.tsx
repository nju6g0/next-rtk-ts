"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getCartItems,
  removeItem,
  clearCart,
} from "@/lib/features/cart/cartSlice";
import { getAllCartItems, getLoading } from "@/lib/features/cart/cartSelectors";
import { CartItem } from "@/interfaces";

export default function Login() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getAllCartItems);
  const loading = useAppSelector(getLoading);

  const handleRemove = (id: string) => {
    dispatch(removeItem({ id }));
  };
  const handleClear = () => {
    dispatch(clearCart());
  };
  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, [dispatch]);

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
      <button type="button" onClick={handleClear}>
        clear cart
      </button>
      {items.map((item: CartItem) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <div>
            <span>{item.quantity}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              handleRemove(item.id);
            }}
          >
            remove
          </button>
        </li>
      ))}
    </main>
  );
}
