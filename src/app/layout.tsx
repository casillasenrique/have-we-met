import React from "react";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { getTodaysGameId } from "@/api/objectData";
import { Analytics } from "@vercel/analytics/next";
import { GAME_URL } from "@/utils/constants";
import { Metadata } from "next";

/**
 * Ensure dynamic rendering for this and all routes.
 *
 * Because we need to determine today's game ID at request time instead
 * of build time, we set the layout to be dynamically rendered.
 */
export const dynamic = "force-dynamic";

const TITLE = "Have We Met?";
const DESCRIPTION = "A game to guess artwork at the Met Museum in New York";
const KEYWORDS =
  "Met Museum, art, game, guessing game, artwork, bandle, wordle, puzzle, clues";
const LARGE_IMAGE = "/main-image.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [
    { name: "Kelly Fang", url: "https://kellyfang.vercel.app/" },
    { name: "Enrique Casillas", url: "https://enriquecasillas.com" },
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: GAME_URL,
    images: [
      {
        url: LARGE_IMAGE,
        width: 800,
        height: 600,
        alt: "Artwork at the Met Museum",
      },
    ],
    siteName: TITLE,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [LARGE_IMAGE],
  },
};

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
        <div className="max-w-[640px] min-h-screen mx-auto bg-white outline outline-primary">
          <ClientLayout todaysGameId={todaysGameId}>{children}</ClientLayout>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
