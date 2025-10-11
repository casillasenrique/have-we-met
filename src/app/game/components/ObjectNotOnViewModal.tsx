"use client";
import React from "react";
import { Modal } from "./shared/Modal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/Button";

export function ObjectNotOnViewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="We can't meet today!">
      <div className="max-w-[350px]">
        <p>Oops, the object for this game is no longer on view at the Met!</p>
        <Image
          src="/despair.png"
          alt="The Lovesick Maiden, Jan Steen"
          width={350}
          height={350}
          objectFit="cover"
          className="my-3"
        />
        <p>
          You can still find this art piece in the Met's{" "}
          <a
            className="text-primary underline"
            href="https://www.metmuseum.org/art/collection"
            target="_blank"
            rel="noopener noreferrer"
          >
            official online collection
            <span className="material-icons text-primary text-xs! pl-1">
              open_in_new
            </span>
          </a>
          , or go{" "}
          <Link href="/archive" className="text-primary underline">
            back to the archive
          </Link>{" "}
          to look for a different work.
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onClose}>Play anyway</Button>
        </div>
      </div>
    </Modal>
  );
}
