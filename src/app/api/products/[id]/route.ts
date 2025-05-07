import { NextRequest, NextResponse } from "next/server";

import { products } from "@/mock";

// 取得 產品資訊
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 從 DB 拿資料，這裡用 mock 模擬
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "查無此商品" }, { status: 404 });
    }
    const product = products.find((product) => product.id === id);
    if (!product) {
      return NextResponse.json({ message: "查無此商品" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得商品列表失敗" }, { status: 500 });
  }
}
