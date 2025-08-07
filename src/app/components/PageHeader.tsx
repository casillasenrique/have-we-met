import React from "react";

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="py-2">
      <h1 className="text-black text-2xl font-bold mb-1">{title}</h1>
      <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
    </div>
  );
}
