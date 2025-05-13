import ProgressBar from "./components/progressBar";
import ScoreBoard from "./components/scoreBoard";

export default function TopNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProgressBar />
      <ScoreBoard />
      {children}
    </>
  );
}
