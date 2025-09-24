"use client";
import { GAME_URL } from "@/utils/constants";
import React from "react";
import { toast } from "react-toastify";

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
  const shareUrl = `${GAME_URL}/game/${gameId}`;
  const shareText = `Have We Met?\n#${gameId} ${score}\n${emojiString}\n${shareUrl}`;

  function handleCopy() {
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy to clipboard");
      });
  }

  if (!isOpen) return null;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;
  // Facebook only supports sharing URLs, not pre-filled text
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[400px] bg-white p-6 shadow-lg flex flex-col">
        <h2 className="pb-2 font-medium text-primary">Share your score</h2>
        <p>Have We Met?</p>
        <p>
          #{gameId} {score}
        </p>
        <p>{emojiString}</p>
        <span className="flex gap-2 pt-2">
          <button onClick={handleCopy}>
            <span className="material-icons text-primary">content_copy</span>
          </button>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                fill="#ea0028"
                d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"
              />
            </svg>
          </a>
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                fill="#ea0028"
                d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z"
              />
            </svg>
          </a>
        </span>
      </div>
    </div>
  );
}
