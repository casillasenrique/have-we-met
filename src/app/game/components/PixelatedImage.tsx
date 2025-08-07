import { Spinner } from "@/app/components/Spinner";
import { useState } from "react";

export function PixelatedImage({
  src,
  revealed,
  handleImageLoad,
}: {
  src: string;
  revealed: boolean;
  handleImageLoad: VoidFunction;
}) {
  return (
    <img
      src={
        revealed ? src : `/api/pixelatedImage?src=${encodeURIComponent(src)}`
      }
      alt={`Pixelated image for ${src}`}
      onLoad={handleImageLoad} // Triggered when the image is fully loaded
      // style={{
      //   display: loading ? "none" : "block", // Hide the image while it's loading
      //   width: "100%", // Ensure it fits the container
      // }}
    />
  );
}
