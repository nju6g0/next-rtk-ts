import HomeClient from "./homeClent";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchData() {
  const res = await fetch(API_URL, {
    next: { revalidate: 10 },
  });
  return res.json();
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // const post = await getPost(params.slug)
  const post = await fetchData();
  return {
    title: "metadata test",
    description: "This is a test for metadata generation",
  };
}

export default async function Home() {
  const data = await fetchData();
  return <HomeClient data={data} />;
}
