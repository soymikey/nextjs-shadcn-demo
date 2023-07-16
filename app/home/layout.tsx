"use client";
import SidebarNav from "@/components/SidebarNav";
import { useGlobalContext } from "@/app/context/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

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
  const { isLogin } = useGlobalContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);

  return (
    <>
      {isLogin ? (
        <div className="flex ">
          <aside className="w-1/5">
            <h1 className="text-4xl font-bold text-center my-8">Gopher AI</h1>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          {children}
        </div>
      ) : null}
    </>
  );
}
