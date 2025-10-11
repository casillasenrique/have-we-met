"use client";
import React from "react";
import { Modal } from "./shared/Modal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/Button";

export function AtCloistersModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Special Location!">
      <div className="max-w-[350px]">
        <p>
          This object is at the{" "}
          <a
            className="text-primary underline"
            href="https://www.metmuseum.org/plan-your-visit/met-cloisters"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>The Met Cloisters!</b>
            <span className="material-icons text-primary text-xs! pl-1">
              open_in_new
            </span>
          </a>
        </p>

        <Image
          src="/cloisters.png"
          alt="The Met Cloisters"
          width={350}
          height={350}
          objectFit="cover"
          className="my-3"
        />
        <p>
          Head to the Cloisters to find this art piece in person, or go{" "}
          <Link href="/archive" className="text-primary underline">
            back to the archive
          </Link>{" "}
          to look for a different work.
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onClose}>I'm here!</Button>
        </div>
      </div>
    </Modal>
  );
}
