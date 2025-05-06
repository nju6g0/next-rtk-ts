"use client";
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Product as ProductType } from "@/interfaces";
import { setItems } from "@/lib/features/products/productsSlice";
import {
  getProducts,
  getProductsEndPoint,
} from "@/lib/features/products/productsSelectors";

interface ProductsProps {
  initialProducts: ProductType[];
}

export default function Products({ initialProducts }: ProductsProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const endPoint = useAppSelector(getProductsEndPoint);
  console.log(products);

  useEffect(() => {
    dispatch(setItems(initialProducts));
  }, [dispatch]);

  return (
    <main>
      <h1>我是產品列表頁</h1>
    </main>
  );
}
