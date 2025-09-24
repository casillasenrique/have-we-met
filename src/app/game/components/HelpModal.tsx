"use client";
import React from "react";

export function HelpModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[400px] bg-white p-6 shadow-lg flex flex-col">
        <span className="flex items-center justify-between">
          <h2 className="pb-2 font-bold text-primary text-lg">How to Play</h2>
          <button onClick={onClose}>
            <span className="material-icons text-primary text-s!">close</span>
          </button>
        </span>
        <p>
          Welcome to <b>Have We Met!</b>
        </p>
        <p>
          Try to find and guess the artwork on view at the Met - given a
          pixelated image of the art and some basic details - in a few clues as
          possible!
        </p>
        <br />
        <span className="flex flex-wrap gap-1 items-center">
          <p>If you think you know the art piece,</p><p> press</p>
          <p className="bg-primary text-white p-1 text-xs">GUESS</p>
          <p>to make a guess, or</p>
          <p className="bg-white text-primary p-1 text-xs border border-primary">
            SKIP
          </p>
          <p>to skip to the next clue.</p>
        </span>
        <br />
        <p>
          We encourage you to play this in person at the Metropolitan Museum of
          Art on Fifth Avenue!
        </p>
        <p>
          Address:{" "}
          <a
            className="text-primary underline"
            href="https://maps.app.goo.gl/nxnUMbiXNwSi3mXSA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>1000 5th Ave, New York, NY 10028</b>
            <span className="material-icons text-primary text-xs! pl-1">
              open_in_new
            </span>
          </a>
        </p>
        <p>
          <b>Hint:</b> Check out{" "}
          <a
            href="https://maps.metmuseum.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            this map of the Met
            <span className="material-icons text-primary text-xs! pl-1">
              open_in_new
            </span>
          </a>{" "}
          to help find today's art piece!
        </p>
        <br />
        <p>Every day has a new art piece, so be sure to come back for more!</p>
      </div>
    </div>
  );
}
