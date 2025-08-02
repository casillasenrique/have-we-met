"use client"

import { useEffect, useRef } from "react";

export default function PixelatedImage({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/main-image.jpg";
    image.crossOrigin = "Anonymous"; // Ensure cross-origin images can be used

    image.onload = () => {
      const gridSize = 30; // Size of each square in the grid
      const width = image.width;
      const height = image.height;

      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, width, height);

      // Get the image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Loop through the grid
      for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          // Calculate the average color for the current grid square
          for (let yy = y; yy < y + gridSize && yy < height; yy++) {
            for (let xx = x; xx < x + gridSize && xx < width; xx++) {
              const index = (yy * width + xx) * 4;
              r += data[index];
              g += data[index + 1];
              b += data[index + 2];
              count++;
            }
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          // Fill the grid square with the average color
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
    };
  }, [src]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />;
}