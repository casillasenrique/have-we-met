"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { PixelatedImage } from "./PixelatedImage";
import {
  CLUE_ACCESSORS,
  OBJECT_TITLE_ACCESSOR,
  MEDIUM_ACCESSOR,
  DIMENSIONS_ACCESSOR,
  ARTIST_NAME_ACCESSOR,
  OBJECT_DATE_ACCESSOR,
} from "../constants";
import { Button } from "../../components/Button";
import { SubmissionModal } from "./SubmissionModal";

export function GameView({ id, data }: { id: number; data: any }) {
  const clueKeys = (
    Object.keys(CLUE_ACCESSORS) as (keyof typeof CLUE_ACCESSORS)[]
  )
    .filter(
      (key) => data[key] !== undefined && data[key] !== null && data[key] !== ""
    )
    .slice(0, 5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clueCount, setClueCount] = useState(0);

  const solution = data[OBJECT_TITLE_ACCESSOR];
  const revealed = clueCount > clueKeys.length;

  const handleSubmitGuess = (guess: string) => {
    // Handle guess submission logic here
    console.log("Guess submitted: ", guess);
    if (guess.toLowerCase() === solution.toLowerCase()) {
      console.log("Correct guess!");
      // Handle correct guess logic here
    } else {
      console.log("Incorrect guess. Try again!");
      // Handle incorrect guess logic here
      setClueCount((prevCount) => prevCount + 1);
    }
  };

  const handleSkip = () => {
    setClueCount((prevCount) => prevCount + 1);
    if (clueCount >= clueKeys.length) {
      // put logic for losing
      console.log("No more clues available to skip. GAME OVER");
      return;
    }
  };

  return (
    <>
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Banner id={id} data={data} revealed={revealed} />
        <PixelatedImage src={data.primaryImage} />
        <div className="flex flex-col gap-4 p-6">
          {clueKeys.map((key, index) => (
            <Clue
              key={key}
              title={CLUE_ACCESSORS[key].title}
              detail={data[key]}
              visible={clueCount > index}
            />
          ))}
          {!revealed ? (
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Guess
              </Button>
              <Button variant="secondary" onClick={handleSkip}>
                Skip
              </Button>
            </div>
          ) : (
            <div className="w-full pt-4 flex justify-between">
              <Link
                href={`/game/${id - 1}`}
                className="text-primary underline underline-offset-8"
              >
                {/* TODO: need to verify there is a prev */}#{id - 1}
              </Link>
              <Link
                href={`/game/${id + 1}`}
                className="text-primary underline underline-offset-8"
              >
                {/* TODO: need to verify there is a next */}#{id + 1}
              </Link>
            </div>
          )}
        </div>
      </div>
      <SubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitGuess}
      />
    </>
  );
}

function Banner({
  id,
  data,
  revealed,
}: {
  id: number;
  data: any;
  revealed: boolean;
}) {
  const formatAttributes = (attributes: Array<string | undefined>) => {
    const attributesArray: Array<string> = [];
    attributes.forEach((attr) => {
      if (attr) {
        attributesArray.push(attr);
      }
    });

    return attributesArray.join(", ");
  };
  return (
    <div className="bg-white p-4 sticky top-20 z-40 border-b border-primary">
      {revealed ? (
        <>
          <p>#{id}</p>
          <h1 className="text-2xl font-bold">
            {data[OBJECT_TITLE_ACCESSOR]}{" "}
            <sup className="text-primary text-sm">[ ]</sup>
          </h1>
          {/* TODO: make sure this exists */}
          <p className="text-sm font-light">
            {formatAttributes([
              data[ARTIST_NAME_ACCESSOR],
              data[OBJECT_DATE_ACCESSOR],
            ])}
          </p>
          <p className="text-sm font-light">
            {formatAttributes([
              data[MEDIUM_ACCESSOR],
              data[DIMENSIONS_ACCESSOR],
            ])}
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Have you MET #{id}?</h1>
          <p className="text-sm text-primary">
            {data[MEDIUM_ACCESSOR]}, {data[DIMENSIONS_ACCESSOR]}
          </p>
        </>
      )}
    </div>
  );
}

function Clue({
  title,
  detail,
  visible = false,
}: {
  title: string;
  detail: string;
  visible?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary font-medium">{title}</p>
      <div className="flex justify-between items-center w-full border border-primary p-2">
        <p>{visible && detail}</p>
        {visible ? <p>eye opened</p> : <p>eye closed</p>}
      </div>
    </div>
  );
}
