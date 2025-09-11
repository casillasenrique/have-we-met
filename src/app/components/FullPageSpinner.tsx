import React from "react";
import { Spinner } from "./Spinner";

export function FullPageSpinner() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center z-50">
      <Spinner />
      <p className="font-medium uppercase">loading MET object...</p>
    </div>
  );
}
