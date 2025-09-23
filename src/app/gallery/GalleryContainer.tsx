import React from "react";
import { GameData } from "@/api/userData";
import { ObjectDataResponse } from "../api/objectData/route";
import { GalleryEntry } from "./GalleryEntry";

interface GalleryContainerProps {
  wonObjects: ObjectDataResponse[];
  wonGames: GameData[];
}

function GalleryContainer({ wonObjects, wonGames }: GalleryContainerProps) {
  return (
    <>
      <h1 className="text-black text-2xl font-bold mb-1">Your Gallery</h1>
      <p className="text-sm text-gray-600 mb-6">
        All the MET objects you’ve collected
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wonObjects.map((o, idx) => {
          if (o.status === "rejected") return;
          return (
            <div key={idx}>
              <GalleryEntry objectData={o} gameData={wonGames[idx]} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export { GalleryContainer };
