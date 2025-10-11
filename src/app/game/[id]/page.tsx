import React from "react";
import { GameView } from "../components/GameView";
import {
  fetchObjectData,
  getObjectId,
  getTodaysGameId,
} from "@/api/objectData";
import { GameNotFound } from "../components/GameNotFound";
export const dynamic = "force-dynamic"; // Ensure dynamic rendering for this route
class GameNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GameNotFoundError";
  }
}

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id, 10);
  const todaysGameId = getTodaysGameId();

  try {
    // Get the object ID from the game ID
    const objectId = getObjectId(gameId);

    if (objectId === null) {
      throw new GameNotFoundError("Game not found for the given ID.");
    }

    const data = await fetchObjectData(objectId);

    return <GameView id={gameId} data={data} todaysGameId={todaysGameId} />;
  } catch (error) {
    console.error((error as Error).message);
    if (error instanceof GameNotFoundError) {
      return <GameNotFound todaysGameId={todaysGameId} />;
    }

    return (
      <div>
        {/* TODO: Generic error screen */}
        <h1>Error</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
