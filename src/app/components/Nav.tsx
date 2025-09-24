import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Nav({ todaysGameId }: { todaysGameId: number }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 flex items-center p-4 bg-primary text-white justify-between">
      <Link href={"/"}>
        <div className="text-lg w-[100px] leading-snug">HAVE WE MET?</div>
      </Link>
      <ul className="flex items-center list-none m-0 ml-8 p-0 gap-6">
        {[
          { href: `/game/${todaysGameId}`, label: "today" },
          { href: "/archive", label: "archive" },
          { href: "/gallery", label: "gallery" },
        ].map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="relative">
              <Link href={href} className={`relative z-10`}>
                {label}
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left"
                layoutId="underline"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
