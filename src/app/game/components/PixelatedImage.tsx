export function PixelatedImage({
  src,
  revealed,
}: {
  src: string;
  revealed: boolean;
}) {
  return (
    <img
      src={
        revealed ? src : `/api/pixelatedImage?src=${encodeURIComponent(src)}`
      }
      alt={`Pixelated image for ${src}}`}
    />
  );
}
