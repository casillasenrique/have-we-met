import React from "react";
import Link from "next/link";

export function Nav() {
    return (
        <nav className="flex items-center p-4 bg-gray-100">
            <div className="font-bold text-lg">Logo</div>
            <ul className="flex list-none m-0 ml-8 p-0 gap-6">
                <li>
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/archive" className="hover:underline">
                        Archive
                    </Link>
                </li>
                <li>
                    <Link href="/gallery" className="hover:underline">
                        Gallery
                    </Link>
                </li>
                <li>
                    <Link href="/game" className="hover:underline">
                        Game
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
