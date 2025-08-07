"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Nav } from "./Nav";

export default function RootLayout({
  children,
  todaysGameId,
}: {
  children: React.ReactNode;
  todaysGameId: number;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && <Nav todaysGameId={todaysGameId}/>}
      <main>{children}</main>
    </>
  );
}
