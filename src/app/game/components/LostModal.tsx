"use client";
import React from "react";
import { Modal } from "./shared/Modal";
import { Button } from "@/app/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { validateAccessionNumber } from "@/utils/functions";

export function LoseModal({
  isOpen,
  objectNumber,
  onChallengeCompleted,
  onChallengeFailed,
}: {
  isOpen: boolean;
  objectNumber: string;
  onChallengeCompleted: () => void;
  onChallengeFailed: () => void;
}) {
  const [input, setInput] = React.useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = React.useState<boolean>(false);
  const [failedChallenge, setFailedChallenge] = React.useState<boolean>(false);

  const handleSubmit = () => {
    if (validateAccessionNumber(objectNumber, input)) {
      console.log("Correctly entered accession number! Challenge completed.");
      onChallengeCompleted();
    } else {
      setFailedChallenge(true);
    }
    setInput("");
  };

  return (
    <Modal
      isOpen={isOpen}
      // Closing the modal is treated as failing the challenge
      onClose={onChallengeFailed}
      title="You didn't find me!"
    >
      <div>
        <p>
          {"You ran out of guesses, click 'reveal art' to find out who I am!"}
        </p>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="group border border-gray-300 rounded-md p-3 mt-2">
            <summary
              className={`${
                failedChallenge ? "" : "cursor-pointer"
              } flex items-center justify-between text-primary font-medium opacity-70`}
              onClick={() => setIsDetailsOpen(!isDetailsOpen)} // Toggle on click
            >
              {failedChallenge ? (
                <span>Wrong object number!</span>
              ) : (
                <>
                  <span>I think I'm right...</span>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isDetailsOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-icons text-sm"
                  >
                    chevron_right
                  </motion.span>
                </>
              )}
            </summary>

            <AnimatePresence>
              {isDetailsOpen && !failedChallenge && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <p>
                    {`Enter the complete object number (typically found at the bottom of the museum label with a '#.#.#' format); ignoring any letters.`}
                  </p>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-9.]*$/.test(value)) {
                        setInput(value);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    placeholder="Object number"
                    className="w-full border border-primary p-2 mt-2 focus:outline-none focus:border-1 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button onClick={handleSubmit} variant="secondary">
                      Enter
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onChallengeFailed}>Reveal Art</Button>
        </div>
      </div>
    </Modal>
  );
}
