import React from "react";
import Image from "next/image";

export function Spinner() {
  return (
    <Image
      src={"/plate.png"}
      alt="Loading..."
      width={240}
      height={240}
      className="animate-spin"
    />
  );
}
