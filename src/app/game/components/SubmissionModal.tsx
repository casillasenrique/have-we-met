"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/app/components/Button";

export function SubmissionModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guess: string) => void;
}) {
  const [guess, setGuess] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(guess);
    setGuess("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[400px] bg-white p-6 shadow-lg flex flex-col">
        <h2 className="pb-2 font-medium text-primary">Who am I?</h2>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Enter your guess"
          className="w-full border border-primary p-2 focus:outline-none focus:border-1 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
