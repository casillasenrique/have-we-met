import React from "react";
import { GameData } from "@/api/userData";
import { ObjectDataResponse } from "../api/objectData/route";
import { GalleryEntry } from "./GalleryEntry";
import { Masonry } from "masonic";

interface GalleryContainerProps {
  /**
   * Array of MET objects data.
   * Length should match wonGames length.
   */
  wonObjects: ObjectDataResponse[];
  /**
   * Array of game data corresponding to the won objects.
   * Length should match wonObjects length.
   */
  wonGames: GameData[];
}

function GalleryContainer({ wonObjects, wonGames }: GalleryContainerProps) {
  const items = wonObjects
    .filter((o) => o.status === "fulfilled")
    .map((o, idx) => {
      return {
        object: o.value,
        game: wonGames[idx],
      };
    })
    .sort((a, b) => {
      // Sort by completion time, most recent first
      const aDate = a.game.completionTime
        ? new Date(a.game.completionTime)
        : new Date(0);
      const bDate = b.game.completionTime
        ? new Date(b.game.completionTime)
        : new Date(0);
      return bDate.getTime() - aDate.getTime();
    });

  return (
    <>
      <h1 className="text-black text-2xl font-bold mb-1">Your Gallery</h1>
      {wonObjects.length > 1 ? (
        <p className="text-sm text-gray-600 mb-6">
          You've collected{" "}
          <span className="text-primary font-semibold">
            {wonObjects.length}
          </span>{" "}
          MET objects!
        </p>
      ) : (
        <p className="text-sm text-gray-600 mb-6">
          You've collected{" "}
          <span className="text-primary font-semibold">
            {wonObjects.length}
          </span>{" "}
          MET object!
        </p>
      )}

      <Masonry
        items={items}
        render={({ data, width }) => {
          return (
            <div key={data.game.id} style={{ width }}>
              <GalleryEntry objectData={data.object} gameData={data.game} />
            </div>
          );
        }}
        columnWidth={150}
        columnGutter={16}
        itemHeightEstimate={300}
        overscanBy={2}
        itemKey={(data, _) => data.game.id}
      />
    </>
  );
}

export { GalleryContainer };
