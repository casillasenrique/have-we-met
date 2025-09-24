import React from "react";
import Link from "next/link";

export function EmptyState({ todaysGameId }: { todaysGameId: number }) {
  return (
    <div className="h-svh flex flex-col justify-center items-center gap-2 p-2 text-primary">
      <p className="text-xl text-center">{"You haven't won any games yet!"} </p>
      <Link
        className="text-lg underline underline-offset-4"
        href={`/game/${todaysGameId}`}
      >
        {"Try playing today's game."}
      </Link>
    </div>
  );
}
