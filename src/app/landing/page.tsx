import { describe } from "node:test";
import Landingclient from "./landingClient";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchData() {
  const res = await fetch(API_URL, {
    next: { revalidate: 10 },
  });
  // return res.json();
  return {
    title: "LANDING PAGE",
    content:
      "唷呼，歡迎進入「SCRUM 新手村」，在正式加入專案開發之前，需要請你先了解 Scrum 的流程與精神！請接受挑戰任務，成功通過 Scrum 新手村的挑戰任務吧~",
    describe: "This is a sample landing page description.",
  };
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // const post = await getPost(params.slug)
  const data = await fetchData();
  return {
    title: data.title,
    description: data.describe,
    keywords: "landing, page, example",
    // authors: [{ name: "Nicole Su", url: "https://example.com" }],
    // openGraph: {
    //   title: data.title,
    //   description: data.describe,
    //   url: `https://example.com/landing/${params.slug}`,
    //   images: [
    //     {
    //       url: "https://example.com/og-image.png",
    //       width: 1200,
    //       height: 630,
    //       alt: "Open Graph Image",
    //     },
    //   ],
    //   siteName: "Landing Page",
    // },
  };
}

export default async function Home() {
  const data = await fetchData();
  return <Landingclient data={data} />;
}
