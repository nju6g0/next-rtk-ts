import ProductsClient from "./productsClient";

async function fetchTodos() {
  const res = await fetch("http://localhost:5500/api/products", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function TodoPage() {
  const res = await fetchTodos();

  return <ProductsClient initialProducts={res.products} />;
}
