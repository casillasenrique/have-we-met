"use client";

import { useEffect } from "react";

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
  const imageSrc = revealed
    ? src
    : `/api/pixelatedImage?src=${encodeURIComponent(src)}`;

  // Preload the image to ensure onLoad and onError fire correctly
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      console.debug("Image loaded.");
      handleImageLoad();
    };
    img.onerror = () => {
      console.log("Image failed to load.");
      handleImageError();
    };
  }, [imageSrc]);

  return (
    <img
      src={imageSrc}
      alt={`Pixelated image for ${src}`}
      onLoad={() => {
        handleImageLoad();
        console.debug("onLoad event triggered");
      }}
      onError={handleImageError}
    />
  );
}
