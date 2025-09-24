import React from "react";
import { Spinner } from "./Spinner";

export function FullPageSpinner() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <Spinner />
      <p className="text-lg font-medium uppercase text-primary">
        loading MET object...
      </p>
    </div>
  );
}
