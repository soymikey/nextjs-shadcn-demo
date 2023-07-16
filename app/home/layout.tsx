"use client";
import { useLayoutEffect } from "react";
import { useGlobalContext } from "../context/store";
import { useRouter } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, isLogin } = useGlobalContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);
  return (
    <div>
      Home layout
      <h1>UserName:{username}</h1>
      {children}
    </div>
  );
}
