import { getTodaysGameId } from "@/api/objectData";
import Link from "next/link";

export default function Home() {
  const todaysGameId = getTodaysGameId();
  return (
    <div
      className="w-screen h-screen bg-cover bg-top max-w-[1024px] text-primary flex flex-col justify-center items-center text-6xl font-bold"
      style={{ backgroundImage: "url('/madame-x.png')" }}
    >
      <div className="w-3/4 flex flex-col items-center gap-8 mb-32">
        <div className="w-full">
          <h1 className="py-1">have we</h1>
          <h1 className="py-1">MET?</h1>
        </div>
        <Link className="w-full text-3xl flex" href={`/game/${todaysGameId}`}>
          <p className="py-1">enter game </p>
          <span className="material-icons text-primary text-[46px]!">
            arrow_right_alt
          </span>
        </Link>
      </div>
    </div>
  );
}
