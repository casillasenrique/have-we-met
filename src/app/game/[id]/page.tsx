import React from "react";
import { GameView } from "../components/GameView";
import { fetchObjectData, getObjectId } from "@/api/objectData";
export const dynamic = "force-dynamic"; // Ensure dynamic rendering for this route

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id, 10);

  // Get the object ID from the game ID
  const objectId = getObjectId(gameId);

  if (objectId === null) {
    return (
      <div>
        <h1>Game Not Found</h1>
        <p>No game found for ID {gameId}.</p>
      </div>
    );
  }

  try {
    const data = await fetchObjectData(objectId);
    return <GameView id={gameId} data={data} />;
  } catch (error) {
    return (
      <div>
        {/* TODO: error screen */}
        <h1>Error</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
