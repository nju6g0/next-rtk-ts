import { NextResponse } from "next/server";

import { cartItems } from "@/mock";

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
