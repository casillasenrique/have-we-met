import React from "react";
import Image from "next/image";
import { GameData } from "@/api/userData";
import {
  ARTIST_NAME_ACCESSOR,
  OBJECT_DATE_ACCESSOR,
  OBJECT_TITLE_ACCESSOR,
  OBJECT_URL_ACCESSOR,
} from "@/utils/constants";
import Link from "next/link";
import { ObjectData } from "@/api/objectData";

function GalleryEntry({
  objectData,
  gameData,
}: {
  objectData: ObjectData;
  gameData: GameData;
}) {
  console.log("gameData ", gameData);
  const numberGuesses = gameData.guesses.length;
  const completionTime = gameData.completionTime
    ? new Date(gameData.completionTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "unknown date";

  return (
    <div className="w-full">
      <Image
        src={objectData.primaryImage}
        alt={"image"}
        layout="responsive" // Image will scale based on container width
        width={100} // Defines the aspect ratio
        height={100}
        objectFit="cover"
      />
      <div className="flex flex-col py-3">
        <div>
          <div className="flex flex-col">
            <Link
              href={`/game/${gameData.id}`}
              className="text-sm text-primary font-bold"
            >
              #{gameData.id}
            </Link>

            <a
              href={objectData[OBJECT_URL_ACCESSOR]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold"
            >
              {objectData[OBJECT_TITLE_ACCESSOR]}{" "}
              {objectData[OBJECT_URL_ACCESSOR] && (
                <span
                  className="material-icons text-primary text-xs"
                  style={{ fontSize: "1rem" }}
                >
                  open_in_new
                </span>
              )}
            </a>
          </div>
          <p className="text-xs font-light">
            {objectData[OBJECT_DATE_ACCESSOR]}
          </p>
          <p className="text-xs font-light">
            {objectData[ARTIST_NAME_ACCESSOR]}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-xs text-gray-500">
            Met on {completionTime},{" "}
            <Link
              href={`/game/${gameData.id}`}
              className="text-xs text-gray-500 underline"
            >
              in {numberGuesses} guess{numberGuesses > 1 && "es"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { GalleryEntry };
