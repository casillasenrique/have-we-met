import React from "react";
import Link from "next/link";
import Image from "next/image";

export function GameNotFound() {
  return (
    <div className="h-svh flex flex-col justify-center items-center gap-2 p-2 text-primary">
      <p className="text-xl text-center">We couldn't find that game!</p>
      {/* TODO: add link to today's game */}
      <Link className="text-lg underline underline-offset-4" href="/game">
        Try playing today's game.
      </Link>
    </div>
  );
}
