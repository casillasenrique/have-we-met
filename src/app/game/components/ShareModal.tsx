"use client";
import React from "react";

export function ShareModal({
  isOpen,
  gameId,
  score,
  emojiString,
  onClose,
}: {
  isOpen: boolean;
  gameId: number;
  score: string;
  emojiString: string;
  onClose: () => void;
}) {
  function handleCopy() {
    const shareText = `Have We Met?\n#${gameId} ${score}\n${emojiString}\nhttps://have-we-met.vercel.app/game/${gameId}`;
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[400px] bg-white p-6 shadow-lg flex flex-col">
        <h2 className="pb-2 font-medium text-primary">Share your score</h2>
        <p>Have We Met?</p>
        <p>
          #{gameId} {score}
        </p>
        <hr className="my-4" />
        <p>{emojiString}</p>
        <span>
          <button onClick={handleCopy}>
            <span className="material-icons text-primary">content_copy</span>
          </button>
        </span>
      </div>
    </div>
  );
}
