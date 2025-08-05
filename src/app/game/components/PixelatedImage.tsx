export function PixelatedImage({ src }: { src: string }) {
  return (
    <img
      src={`/api/pixelatedImage?src=${encodeURIComponent(src)}`}
      alt={`Pixelated image for ${src}}`}
    />
  );
}
