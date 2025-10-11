import React from "react";
import { GameView } from "../components/GameView";
import {
  fetchObjectData,
  getObjectId,
  getTodaysGameId,
} from "@/api/objectData";
import {
  CLOISTERS,
  DEPARTMENT_ACCESSOR,
  GALLERY_NUMBER_ACCESSOR,
} from "../../../utils/constants";
import { GameNotFound } from "../components/GameNotFound";
export const dynamic = "force-dynamic"; // Ensure dynamic rendering for this route

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id, 10);
  const todaysGameId = getTodaysGameId();

  // Get the object ID from the game ID
  const objectId = getObjectId(gameId);

  if (objectId === null) {
    return <GameNotFound todaysGameId={todaysGameId} />;
  }

  try {
    const data = await fetchObjectData(objectId);
    console.log("Object dump:", data);

    if (!data[GALLERY_NUMBER_ACCESSOR]) {
      throw new Error("Object is no longer on view!");
    }

    let isAtCloisters = false;
    if (data[DEPARTMENT_ACCESSOR] === CLOISTERS) {
      console.log("Object deparment is The Cloisters");
      isAtCloisters = true;
    }

    return (
      <GameView
        id={gameId}
        data={data}
        todaysGameId={todaysGameId}
        isAtCloisters={isAtCloisters}
      />
    );
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
