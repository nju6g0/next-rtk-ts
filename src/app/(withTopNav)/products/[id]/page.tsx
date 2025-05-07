import ProductClient from "./productClient";

async function fetchProduct(id: string) {
  const url = process.env.API_END_POINT;
  const res = await fetch(`${url}/products/${id}`, {
    next: { revalidate: 10 },
  });
  return res.json();
}
interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;
  const res = await fetchProduct(id);

  return <ProductClient productData={res._product} />;
}
