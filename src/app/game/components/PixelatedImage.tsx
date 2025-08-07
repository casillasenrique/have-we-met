import { Spinner } from "@/app/components/Spinner";
import { useState } from "react";

export function PixelatedImage({
  src,
  revealed,
  handleImageLoad,
  handleImageError,
}: {
  src: string;
  revealed: boolean;
  handleImageLoad: VoidFunction;
  handleImageError: VoidFunction;
}) {
  return (
    <img
      src={
        revealed ? src : `/api/pixelatedImage?src=${encodeURIComponent(src)}`
      }
      alt={`Pixelated image for ${src}`}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
}
