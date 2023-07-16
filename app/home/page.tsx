"use client";
import UserNav from "@/components/UserNav";
import React from "react";

function HomePage() {
  return (
    <div className="flex-1 mt-10 mx-10">
      <div className="flex justify-end">
        <UserNav />
      </div>
    </div>
  );
}

export default HomePage;
