import React from "react";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { getTodaysGameId } from "@/api/objectData";
import { Analytics } from "@vercel/analytics/next";

/**
 * Ensure dynamic rendering for this and all routes.
 *
 * Because we need to determine today's game ID at request time instead
 * of build time, we set the layout to be dynamically rendered.
 */
export const dynamic = "force-dynamic";

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
