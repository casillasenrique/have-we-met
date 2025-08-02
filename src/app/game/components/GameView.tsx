"use client";
import React from "react";
import { useState } from "react";
import { PixelatedImage } from "./PixelatedImage";
import { CLUE_ACCESSORS } from "../constants";
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

  const handleSubmitGuess = (guess: string) => {
    // Handle guess submission logic here
    console.log("Guess submitted: ", guess);
  };

  const handleSkip = () => {
    // Handle skip logic here
    console.log("Skipped the game");
  };

  return (
    <>
      <div>
        <PixelatedImage src={data.primaryImage} />
        <div className="flex flex-col gap-4 p-6">
          {clueKeys.map((key) => (
            <Clue
              key={key}
              title={CLUE_ACCESSORS[key].title}
              detail={data[key]}
              visible={false}
            />
          ))}
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Guess
            </Button>
            <Button variant="secondary" onClick={handleSkip}>
              Skip
            </Button>
          </div>
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
      <p className="text-primary">{title}</p>
      <div className="flex justify-between items-center w-full border border-primary p-2">
        <p>{detail}</p>
        {!visible && <p>eye</p>}
      </div>
    </div>
  );
}
