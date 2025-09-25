import React from "react";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { getTodaysGameId } from "@/api/objectData";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
import { GAME_URL } from "@/utils/constants";

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
const AUTHOR = "Enrique Casillas and Kelly Fang";
const LARGE_IMAGE = "/main-image.jpg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const todaysGameId = getTodaysGameId();
  console.log("Today's game ID is:", todaysGameId);

  return (
    <html lang="en">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="author" content={AUTHOR} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={LARGE_IMAGE} />
        <meta property="og:url" content={GAME_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={LARGE_IMAGE} />
      </Head>
      <body className="bg-white ">
        <div className="max-w-[640px] min-h-screen mx-auto bg-white outline outline-primary">
          <ClientLayout todaysGameId={todaysGameId}>{children}</ClientLayout>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
