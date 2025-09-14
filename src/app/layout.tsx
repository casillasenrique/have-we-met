import React from "react";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { getTodaysGameId } from "@/api/objectData";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const todaysGameId = getTodaysGameId();
  console.log("Today's game ID is:", todaysGameId);

  return (
    <html lang="en">
      <body className="bg-white ">
        <div className="max-w-[1024px] min-h-screen mx-auto bg-white outline outline-primary">
          <ClientLayout todaysGameId={todaysGameId}>{children}</ClientLayout>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
