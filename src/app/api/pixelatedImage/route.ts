/**
 * Route handler for pixelated image processing.
 * This handler fetches an image from the Metropolitan Museum of Art's API,
 * pixelates it, and returns the processed image.
 */

import { NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  if (!src) {
    return new NextResponse("Missing src parameter", { status: 400 });
  }
  try {
    const response = await fetch(src);
    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Resize down and back up to pixelate
    const pixelSize = 100; // Larger value = more pixelation
    const metadata = await sharp(buffer).metadata();

    const width = metadata.width || 500;
    const height = metadata.height || 500;
    const smallWidth = Math.ceil(width / pixelSize);
    const smallHeight = Math.ceil(height / pixelSize);

    console.log(
      `Pixelating image from source "${src}" using pixel size ${pixelSize}. Scaling from ${width}x${height} -> ${smallWidth}x${smallHeight}.`
    );

    const downscaled = await sharp(buffer)
      .blur(1) // Add blur to smooth out the pixelation
      .resize(smallWidth, smallHeight, { kernel: "nearest" })
      .png({ palette: true }) // enable indexed color (palette-based) for cleaner pixelation
      .toBuffer();

    const pixelated = await sharp(downscaled)
      .resize(width, height, { kernel: "nearest" })
      .toFormat("jpeg")
      .toBuffer();

    return new NextResponse(pixelated, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error processing image", { status: 500 });
  }
}
