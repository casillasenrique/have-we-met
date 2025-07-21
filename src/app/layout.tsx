"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Nav } from "./components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname !== "/" && <Nav />}
        {children}
      </body>
    </html>
  );
}