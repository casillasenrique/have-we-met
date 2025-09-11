"use client";
import React, { useEffect, useState } from "react";
import { GameData, GameStatus, getOrCreateUserData } from "@/api/userData";
import { ObjectDataResponse } from "../api/objectData/route";
import { GalleryContainer } from "./GalleryContainer";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FullPageSpinner } from "../components/FullPageSpinner";

export default function Gallery() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wonObjects, setWonObjects] = useState<ObjectDataResponse[]>([]);
  const [wonGames, setWonGames] = useState<GameData[]>([]);

  useEffect(() => {
    const fetchWonGames = async () => {
      setIsLoading(true);
      try {
        const data = getOrCreateUserData();
        const _wonGames = data.playedGames.filter(
          (g) => g.status === GameStatus.WON
        );
        const wonGamesIds = _wonGames.map((g) => g.id);

        console.log("wonGameIds ", wonGamesIds);

        const response = await fetch("/api/objectData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameIds: wonGamesIds }),
        });
        const result: Array<ObjectDataResponse> = await response.json();
        setWonObjects(result);
        setWonGames(_wonGames);
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWonGames();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-1">Your Gallery</h1>
      <p className="text-sm text-gray-600 mb-6">
        All the MET objects you’ve collected
      </p>
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <ErrorState />
      ) : !wonObjects || !wonObjects.length ? (
        <EmptyState />
      ) : (
        <GalleryContainer wonGames={wonGames} wonObjects={wonObjects} />
      )}
    </div>
  );
}
