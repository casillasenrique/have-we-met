"use client";
import React, { cache, useEffect } from "react";
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
} from "@/utils/constants";
import { Button } from "../../components/Button";
import { SubmissionModal } from "./SubmissionModal";
import {
  addGuessToGame,
  finishGame,
  GameStatus,
  getOrCreateGameData,
  Guess,
} from "@/api/userData";
import { ImageNotFound } from "./ImageNotFound";
import { ObjectData } from "@/api/objectData";
import { guessIsCloseEnough } from "@/api/stringComparison";
import { FullPageSpinner } from "@/app/components/FullPageSpinner";
import { ShareModal } from "./ShareModal";
import { getEmojiString } from "@/utils/functions";
import { CloseEnoughModal } from "./CloseEnoughModal";
import { HelpModal } from "./HelpModal";

export function GameView({
  id,
  data,
  todaysGameId,
}: {
  id: number;
  data: ObjectData;
  todaysGameId: number;
}) {
  const clueKeys = (
    Object.keys(CLUE_ACCESSORS) as (keyof typeof CLUE_ACCESSORS)[]
  )
    .filter(
      (key) => data[key] !== undefined && data[key] !== null && data[key] !== ""
    )
    .slice(0, 5);

  const solution = data[OBJECT_TITLE_ACCESSOR];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isImageError, setisImageError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guesses, setGuesses] = useState<Array<Guess>>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.IN_PROGRESS
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCloseEnoughModalOpen, setIsCloseEnoughModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(`Fetching existing game data for ID: ${id}`);
    const cachedData = getOrCreateGameData(id);
    console.log(
      `Fetched cached data, game status: ${cachedData.status}; clues guessed: ${cachedData.guesses.length}`
    );

    console.log("cached guesses ", cachedData.guesses);

    setGuesses(cachedData.guesses);
    setGameStatus(cachedData.status);
    setIsLoading(false);
  }, []);

  const handleSubmitGuess = (guess: string) => {
    // Handle guess submission logic here
    console.log("Guess submitted: ", guess);

    // todo: MAKE SURE THIS LOG IS REMOVED
    console.log("Solution for debugging: ", solution);
    addGuessToGame(id, { value: guess } as Guess);
    setGuesses((prevGuesses) => [...prevGuesses, { value: guess }]);
    // todo(enrique): normalize the special characters in the direct comparison
    if (guess.toLowerCase() === solution.toLowerCase()) {
      console.log("Correct guess!");
      // Handle correct guess logic here
      // Mark the game as finished and won
      finishGame(id, true);
      setGameStatus(GameStatus.WON);
    } else if (guessIsCloseEnough(solution, guess)) {
      console.log("CLOSE! Did you mean: ", solution);
      setIsCloseEnoughModalOpen(true);
    } else {
      if (guesses.length >= clueKeys.length) {
        // If the user has used all clues, mark the game as lost
        console.log("No more clues available. GAME OVER");
        finishGame(id, false);
        setGameStatus(GameStatus.LOST);
      }
    }
  };

  useEffect(() => {
    if (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [gameStatus]);

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

  return (
    <div className="h-full">
      {(isLoading || isImageLoading) && <FullPageSpinner />}
      <div className={isLoading || isImageLoading ? "hidden" : ""}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Banner
          id={id}
          data={data}
          gameStatus={gameStatus}
          onShare={() => setIsShareModalOpen(true)}
        />
        {isImageError ? (
          <ImageNotFound />
        ) : (
          <PixelatedImage
            src={data.primaryImage}
            revealed={
              gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST
            }
            handleImageLoad={() => {
              setIsImageLoading(false);
            }}
            handleImageError={() => {
              setIsImageLoading(false);
              setisImageError(true);
            }}
          />
        )}
        <div className="flex flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            {clueKeys.map((key, index) => (
              <div key={key} className="flex flex-col gap-4">
                <Clue
                  key={key}
                  title={CLUE_ACCESSORS[key].title}
                  detail={data[key]}
                  visible={
                    guesses.length > index ||
                    gameStatus === GameStatus.WON ||
                    gameStatus === GameStatus.LOST
                  }
                />
                {guesses.length > index && (
                  <p className="text-xs text-gray-500">
                    Your guess: {guesses[index].value || "Skipped"}
                  </p>
                )}
                {index < clueKeys.length - 1 && (
                  <hr className="border-t border-gray-300" />
                )}
              </div>
            ))}
            {(gameStatus === GameStatus.IN_PROGRESS ||
              gameStatus === GameStatus.NOT_PLAYED) && (
              <div className="pt-4 flex justify-end gap-2 items-center">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Guess
                </Button>
                <Button variant="secondary" onClick={handleSkip}>
                  Skip
                </Button>
              </div>
            )}
          </div>
          <div className="w-full pt-8 flex justify-between">
            {id > 1 ? (
              <Link
                href={`/game/${id - 1}`}
                className={`flex items-center text-primary`}
              >
                <span className={`material-icons text-primary`}>
                  arrow_left
                </span>
                #{id - 1}
              </Link>
            ) : (
              <span></span>
            )}
            {id < todaysGameId ? (
              <Link
                href={`/game/${id + 1}`}
                className="text-primary flex items-center"
              >
                {/* TODO: need to verify there is a next */}#{id + 1}
                <span className="material-icons text-primary">arrow_right</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      <SubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitGuess}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        gameId={id}
        score={`${gameStatus === GameStatus.WON ? guesses.length : "X"}/${
          clueKeys.length + 1 // +1 to account for the final guess
        }`}
        emojiString={getEmojiString(guesses, clueKeys.length, gameStatus)}
        onClose={() => setIsShareModalOpen(false)}
      />
      <CloseEnoughModal
        isOpen={isCloseEnoughModalOpen}
        onClose={() => setIsCloseEnoughModalOpen(false)}
        onConfirm={() => {
          setIsCloseEnoughModalOpen(false);
          finishGame(id, true);
          setGameStatus(GameStatus.WON);
        }}
        onDeny={() => {
          setIsCloseEnoughModalOpen(false);
          if (guesses.length >= clueKeys.length) {
            console.log("No more clues available. GAME OVER");
            finishGame(id, false);
            setGameStatus(GameStatus.LOST);
          }
        }}
        guess={guesses[guesses.length - 1]?.value}
        actual={solution}
      />
    </div>
  );
}

function Banner({
  id,
  data,
  gameStatus,
  onShare,
}: {
  id: number;
  data: ObjectData;
  gameStatus: GameStatus;
  onShare: () => void;
}) {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

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
      {gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST ? (
        <>
          <div className="flex items-center gap-1">
            <p>#{id}</p>
            {gameStatus === GameStatus.WON ? (
              <span className="material-icons text-green-500">check</span>
            ) : (
              <span className="material-icons text-red-500">close</span>
            )}
            <button onClick={onShare} className="text-sm flex">
              <span className="material-icons text-primary">share</span>
            </button>
          </div>
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
          <HelpModal
            isOpen={isHelpModalOpen}
            onClose={() => setIsHelpModalOpen(false)}
          />
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-2xl font-bold">Have you MET #{id}?</h1>

            <button
              className="flex items-center justify-center rounded-full w-6 h-6 border-primary border-2 mr-1"
              onClick={() => setIsHelpModalOpen(true)}
            >
              <span className="material-icons text-primary text-xs!">
                question_mark
              </span>
            </button>
          </div>

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
