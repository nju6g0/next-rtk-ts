import { Product as ProductType } from "@/interfaces";

interface ProductProps {
  productData: ProductType;
}
export default function Login({ productData }: ProductProps) {
  console.log(productData);
  return (
    <main>
      <h1>我是產品明細頁</h1>
    </main>
  );
}
