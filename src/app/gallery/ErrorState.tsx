import React from "react";
import Link from "next/link";

export function ErrorState() {
  return (
    <div className="h-[700px] flex flex-col justify-center items-center gap-2 p-2 text-primary">
      <p className="text-xl text-center">
        There was an error loading your gallery{" "}
      </p>
    </div>
  );
}
