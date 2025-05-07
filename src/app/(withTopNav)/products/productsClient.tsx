"use client";
import { use, useEffect } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Product as ProductType } from "@/interfaces";
import { setItems } from "@/lib/features/products/productsSlice";
import {
  getProducts,
  getProductsEndPoint,
} from "@/lib/features/products/productsSelectors";
import { addItem } from "@/lib/features/cart/cartSlice";

interface ProductsProps {
  initialProducts: ProductType[];
}

export default function Products({ initialProducts }: ProductsProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const endPoint = useAppSelector(getProductsEndPoint);
  console.log(products);

  const addToCart = (product: ProductType) => {
    dispatch(addItem(product));
    console.log("add to cart", product);
  };

  useEffect(() => {
    dispatch(setItems(initialProducts));
  }, [dispatch]);

  return (
    <main>
      <h1>我是產品列表頁</h1>
      <div className="flex flex-col gap-4">
        {products.map((product: ProductType) => {
          const randomImgID = Math.floor(Math.random() * 1000);
          return (
            <li key={product.id} className="flex">
              <Image
                className="shrink-0"
                width={100}
                height={150}
                src={`https://picsum.photos/id/${randomImgID}/200/300.webp`}
                // src={product.image}
                alt={product.name}
                loading="lazy"
              />
              <div>
                <p>{product.name}</p>
                <div>
                  <span>{product.price}</span>
                </div>
                <p>{product.description}</p>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  add to cart
                </button>
              </div>
            </li>
          );
        })}
      </div>
    </main>
  );
}
