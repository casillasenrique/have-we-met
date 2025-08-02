"use client";
import React from "react";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Nav } from "./components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-white">
        <div className="max-w-[1024px] min-h-screen mx-auto bg-white border border-primary box-border">
          {pathname !== "/" && <Nav />}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
