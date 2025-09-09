import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ todaysGameId }: { todaysGameId: number }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center p-4 bg-primary text-white justify-between">
      <div className="text-lg w-[100px] leading-snug">
        <Link href={"/"}>have we MET?</Link>
      </div>
      <ul className="flex items-center list-none m-0 ml-8 p-0 gap-6">
        <li>
          <Link
            href={`/game/${todaysGameId}`}
            className={
              pathname === `/game/${todaysGameId}`
                ? `underline underline-offset-8`
                : "hover:underline hover:underline-offset-8"
            }
          >
            today
          </Link>
        </li>
        <li>
          <Link
            href="/archive"
            className={
              pathname === "/archive"
                ? `underline underline-offset-8`
                : "hover:underline hover:underline-offset-8"
            }
          >
            archive
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className={
              pathname === "/gallery"
                ? `underline underline-offset-8`
                : "hover:underline hover:underline-offset-8"
            }
          >
            gallery
          </Link>
        </li>
      </ul>
    </nav>
  );
}
