import React from "react";
import { GameData } from "@/api/userData";
import { ObjectDataResponse } from "../api/objectData/route";
import { GalleryEntry } from "./GalleryEntry";
import { Masonry } from "masonic";

interface GalleryContainerProps {
  wonObjects: ObjectDataResponse[];
  wonGames: GameData[];
}

function GalleryContainer({ wonObjects, wonGames }: GalleryContainerProps) {
  const items = wonObjects
    .map((o, idx) => ({
      object: o,
      game: wonGames[idx],
      idx,
    }))
    .filter((item) => item.object.status !== "rejected");

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
        render={({ index, data, width }) => {
          const { object, game, idx } = data;
          return (
            <div key={idx} style={{ width }}>
              <GalleryEntry objectData={object} gameData={game} />
            </div>
          );
        }}
        columnWidth={150}
        columnGutter={16}
        itemHeightEstimate={300}
        overscanBy={2}
        itemKey={(data, index) => data.idx}
      />
    </>
  );
}

export { GalleryContainer };
