import { TopNav } from "./topNav";
import { Footer } from "./footer";

export default function TopNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
