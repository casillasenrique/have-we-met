"use client";
import React from "react";
import { Button } from "@/app/components/Button";

export function CloseEnoughModal({
  isOpen,
  onClose,
  onConfirm,
  onDeny,
  guess,
  actual,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDeny: () => void;
  guess: string;
  actual: string;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[400px] bg-white p-6 shadow-lg flex flex-col">
        <h2 className="pb-2 text-xl text-primary font-bold">CLOSE!</h2>
        <p className="text-lg font-medium">
          Did you mean <span className="text-primary">{actual}</span>?
        </p>
        <p className="text-md font-md">You guessed {guess}</p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onDeny}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
