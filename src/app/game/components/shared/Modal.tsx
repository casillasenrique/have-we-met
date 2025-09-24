"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Stop propagation so clicking inside the content doesn’t close */}
          <motion.div
            key="modal-content"
            className="relative z-10 bg-white rounded p-4 shadow-lg min-w-[400px]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex items-center justify-between">
              <h2 className="pb-2 text-xl text-primary font-bold">{title}</h2>
              <button onClick={onClose}>
                <span className="material-icons text-primary text-s!">
                  close
                </span>
              </button>
            </span>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
