"use client";
import { useLayoutEffect } from "react";
import { useGlobalContext } from "../context/store";
import { useRouter } from "next/navigation";
import SidebarNav from "@/components/SidebarNav";

const sidebarNavItems: ISidebarNavItem[] = [
  {
    title: "Agents",
    href: "/home",
  },
  {
    title: "Settings",
    href: "/home/settings",
  },
];

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
    <div className="flex ">
      <aside className="w-1/5">
        <h1 className="text-4xl font-bold text-center my-8">Gopher AI</h1>
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {children}
    </div>
  );
}
