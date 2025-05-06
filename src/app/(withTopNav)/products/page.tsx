import ProductsClient from "./productsClient";

async function fetchTodos() {
  const url = process.env.API_END_POINT;
  const res = await fetch(`${url}/products`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function TodoPage() {
  const res = await fetchTodos();

  return <ProductsClient initialProducts={res.products} />;
}
