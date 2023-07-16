import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      Home layout
      {children}
    </div>
  );
}
