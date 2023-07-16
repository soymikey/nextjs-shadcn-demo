import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/app/context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "This is a Nextjs+Shadcn/ui demo",
  keywords: "AI,artificial intelligence,Machine Learning,Deep Learning",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
