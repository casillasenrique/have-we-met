import React from "react";
import Link from "next/link";

export function GameNotFound({ todaysGameId }: { todaysGameId: number }) {
  return (
    <div className="h-svh flex flex-col justify-center items-center gap-2 p-2 text-primary">
      <p className="text-xl text-center">{"We couldn't find that game!"}</p>
      <Link
        className="text-lg underline underline-offset-4"
        href={`/game/${todaysGameId}`}
      >
        {"Try playing today's game."}
      </Link>
    </div>
  );
}
