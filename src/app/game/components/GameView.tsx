"use client";
import React, { useEffect } from "react";
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
  OBJECT_URL_ACCESSOR,
} from "../constants";
import { Button } from "../../components/Button";
import { SubmissionModal } from "./SubmissionModal";
import { Spinner } from "@/app/components/Spinner";
import {
  addGuessToGame,
  finishGame,
  GameStatus,
  getOrCreateGameData,
  Guess,
} from "@/api/userData";

export function GameView({ id, data }: { id: number; data: any }) {
  const clueKeys = (
    Object.keys(CLUE_ACCESSORS) as (keyof typeof CLUE_ACCESSORS)[]
  )
    .filter(
      (key) => data[key] !== undefined && data[key] !== null && data[key] !== ""
    )
    .slice(0, 5);

  const solution = data[OBJECT_TITLE_ACCESSOR];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guesses, setGuesses] = useState<Array<Guess>>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.IN_PROGRESS
  );

  useEffect(() => {
    console.log(`Fetching existing game data for ID: ${id}`);
    const cachedData = getOrCreateGameData(id);
    console.log(
      `Fetched cached data, game status: ${cachedData.status}; clues guessed: ${cachedData.guesses.length}`
    );
    setGuesses(cachedData.guesses);
    setGameStatus(cachedData.status);
    setIsLoading(false);
  }, []);

  const handleSubmitGuess = (guess: string) => {
    // Handle guess submission logic here
    console.log("Guess submitted: ", guess);
    addGuessToGame(id, { value: guess } as Guess);
    setGuesses((prevGuesses) => [...prevGuesses, { value: guess }]);
    if (guess.toLowerCase() === solution.toLowerCase()) {
      console.log("Correct guess!");
      // Handle correct guess logic here
      // Mark the game as finished and won
      finishGame(id, true);
      setGameStatus(GameStatus.WON);
    } else {
      if (guesses.length >= clueKeys.length) {
        // If the user has used all clues, mark the game as lost
        console.log("No more clues available. GAME OVER");
        finishGame(id, false);
        setGameStatus(GameStatus.LOST);
      }
    }
  };

  const handleSkip = () => {
    // Store the guess in the game data as an empty guess
    addGuessToGame(id, { value: "" } as Guess);
    setGuesses((prevGuesses) => [...prevGuesses, { value: "" }]);
    if (guesses.length >= clueKeys.length) {
      // If the user has used all clues, mark the game as lost
      console.log("No more clues available. GAME OVER");
      finishGame(id, false);
      setGameStatus(GameStatus.LOST);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Spinner />
        <p className="font-medium uppercase">loading MET object...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Banner
          id={id}
          data={data}
          revealed={gameStatus !== GameStatus.IN_PROGRESS}
        />
        <PixelatedImage src={data.primaryImage} />
        <div className="flex flex-col gap-4 p-6">
          {clueKeys.map((key, index) => (
            <Clue
              key={key}
              title={CLUE_ACCESSORS[key].title}
              detail={data[key]}
              visible={guesses.length > index}
            />
          ))}
          {gameStatus === GameStatus.IN_PROGRESS ? (
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
            {data[OBJECT_URL_ACCESSOR] && (
              <a
                href={data[OBJECT_URL_ACCESSOR]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-icons text-primary text-xs">
                  open_in_new
                </span>
              </a>
            )}
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
      <div className="flex justify-between items-center w-full border border-primary p-2 gap-6">
        <p>{visible && detail}</p>
        {visible ? (
          <span className="material-icons text-primary">lock_open</span>
        ) : (
          <span className="material-icons text-primary">lock</span>
        )}
      </div>
    </div>
  );
}
