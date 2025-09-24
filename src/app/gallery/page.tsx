import { getTodaysGameId } from "@/api/objectData";
import GalleryView from "./GalleryView";

export default function Gallery() {
  const todaysGameId = getTodaysGameId();
  return <GalleryView todaysGameId={todaysGameId} />;
}
