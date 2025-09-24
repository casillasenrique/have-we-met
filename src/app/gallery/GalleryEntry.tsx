import React from "react";
import Image from "next/image";
import { ObjectDataResponse } from "../api/objectData/route";
import { GameData } from "@/api/userData";
import {
  ARTIST_NAME_ACCESSOR,
  OBJECT_DATE_ACCESSOR,
  OBJECT_TITLE_ACCESSOR,
  OBJECT_URL_ACCESSOR,
} from "@/utils/constants";
import Link from "next/link";

function GalleryEntry({
  objectData,
  gameData,
}: {
  objectData: ObjectDataResponse;
  gameData: GameData;
}) {
  console.log("gameData ", gameData);
  const data = objectData.value;
  const numberGuesses = gameData.guesses.length;

  return (
    <div className="w-full">
      <Image
        src={objectData.value.primaryImage}
        alt={"image"}
        layout="responsive" // Image will scale based on container width
        width={100} // Defines the aspect ratio
        height={100}
        objectFit="cover"
      />
      <div className="flex flex-col py-3">
        <div>
          <h1 className="text-sm text-primary font-bold">#{gameData.id}</h1>
          <h1 className="text-sm font-bold">
            {data[OBJECT_TITLE_ACCESSOR]}{" "}
            {data[OBJECT_URL_ACCESSOR] && (
              <a
                href={data[OBJECT_URL_ACCESSOR]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="material-icons text-primary text-xs"
                  style={{ fontSize: "1rem" }}
                >
                  open_in_new
                </span>
              </a>
            )}
          </h1>
          <p className="text-xs font-light">{data[OBJECT_DATE_ACCESSOR]}</p>
          <p className="text-xs font-light">{data[ARTIST_NAME_ACCESSOR]}</p>
        </div>
        <div className="flex flex-row">
          <p className="text-xs text-gray-500">
            Met on {gameData.completionTime},{" "}
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
