"use client";
import React from "react";
import { Button } from "@/app/components/Button";
import { Modal } from "./shared/Modal";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Close!">
      <>
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
      </>
    </Modal>
  );
}
