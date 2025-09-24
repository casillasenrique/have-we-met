"use client";
import React from "react";
import { useState } from "react";
import { Modal } from "./shared/Modal";
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Who am I?">
      <>
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
      </>
    </Modal>
  );
}
