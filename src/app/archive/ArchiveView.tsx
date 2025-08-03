"use client";
import Link from "next/link";
import { ArchiveDay } from "./page";
import { useCallback, useEffect, useState } from "react";
import { GameStatus, getOrCreateUserData, UserData } from "@/api/userData";

const DEFAULT_DAY_CIRCLE_STYLE = "border-primary";

export default function ArchiveView({ weeks }: { weeks: ArchiveDay[][] }) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    console.debug("ArchiveView rendered with weeks:", weeks);
    // Fetch user data
    const userData = getOrCreateUserData();
    console.log("Fetched user data:", userData);
    setUserData(userData);
  }, []);

  const getGameCircleStyle = useCallback(
    (gameId: number) => {
      if (!userData) {
        console.warn("User data is not available yet");
        return DEFAULT_DAY_CIRCLE_STYLE; // Default style if userData is not available
      }
      const game = userData.playedGames.find((g) => g.id === gameId);

      switch (game?.status) {
        case GameStatus.WON:
        case GameStatus.LOST:
          return DEFAULT_DAY_CIRCLE_STYLE + " bg-primary";
        case GameStatus.IN_PROGRESS:
            return DEFAULT_DAY_CIRCLE_STYLE + " bg-primary/50";
        default:
          return DEFAULT_DAY_CIRCLE_STYLE; // Default style for unknown status
      }
    },
    [userData]
  );

  return weeks.map((week, weekIndex) =>
    week.map(({ dateString, gameId }, dayIndex) => (
      <div
        key={`${weekIndex}-${dayIndex}`}
        className="flex flex-col items-center"
      >
        {gameId === 0 ? (
          // Placeholder for empty days
          <div className="w-10 h-10 border-2 border-gray-300 rounded-full mb-1"></div>
        ) : (
          // Game circle with link to game page
          <Link
            href={`/game/${gameId}`}
            className="flex flex-col items-center w-full"
          >
            <div
              className={`w-10 h-10 border-2 ${getGameCircleStyle(
                gameId
              )} rounded-full mb-1 hover:bg-primary transition-colors duration-150`}
            ></div>
            <span className="text-xs font-bold text-primary">{gameId}</span>
            <span className="text-xs text-primary">{dateString}</span>
          </Link>
        )}
      </div>
    ))
  );
}
