import { NextResponse } from "next/server";

import { CartItem } from "@/interfaces/cart";

const cartItems: CartItem[] = [
  {
    id: "Product_1",
    name: "Product 1",
    price: 10.0,
    image: "https://picsum.photos/200/300",
    description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    quantity: 2,
  },
  {
    id: "Product_2",
    name: "Product 2",
    price: 20.0,
    image: "https://picsum.photos/200/300",
    description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    quantity: 1,
  },
  {
    id: "Product_3",
    name: "Product 3",
    price: 15.0,
    image: "https://picsum.photos/200/300",
    description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    quantity: 3,
  },
];

// 取得 所有 Cart Items
export async function GET() {
  try {
    // 從 DB 拿資料，這裡用 mock 模擬
    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得購物車失敗" }, { status: 500 });
  }

  //   return new Response(
  //     JSON.stringify({
  //       message: "Login successful",
  //       user,
  //     }),
  //     { status: 200, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  // return new Response(JSON.stringify({ message: "Invalid credentials" }), {
  //   status: 403,
  //   headers: { "Content-Type": "application/json" },
  // });
}
