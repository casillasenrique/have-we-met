import React from "react";

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 border border-primary uppercase ${
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-white text-primary"
      } ${className}`}
    >
      {children}
    </button>
  );
}
