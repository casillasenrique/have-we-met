import React from "react";
import Link from "next/link";

export default function Archive() {
  const today = new Date();
  const daysInWeek = ["s", "m", "t", "w", "th", "f", "s"];
  const totalGames = 54; // Example total number of games
  const archiveDays = Array.from({ length: totalGames }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      gameNumber: totalGames - index, // Game numbers count down from totalGames
    };
  });

  // Create an array of arrays (weeks)
  const weeks = [];
  for (let i = 0; i < archiveDays.length; i += 7) {
    // Slice the array into chunks of 7 days
    const week = archiveDays.slice(i, i + 7);

    // Fill the week with empty days if it has less than 7 days
    while (week.length < 7) {
      week.push({ date: "", gameNumber: 0 });
    }

    weeks.push(week.reverse()); // Reverse the week to have the most recent day on the left
  }

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-4">Play the archive</h1>
      <p className="text-sm text-gray-600 mb-6">
        Click on a circle to guess the MET object of that day
      </p>
      <div className="grid grid-cols-7 gap-4 text-center">
        {/* Days of the week */}
        {daysInWeek.map((day, index) => (
          <div key={index} className="text-xl font-bold text-primary">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map(({ date, gameNumber }, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className="flex flex-col items-center"
            >
              {gameNumber === 0 ? (
                // Placeholder for empty days
                <div className="w-10 h-10 border-2 border-gray-300 rounded-full mb-1"></div>
              ) : (
                // Game circle with link to game page
                <>
                  <div className="w-10 h-10 border-2 border-primary rounded-full mb-1 hover:bg-primary transition-colors duration-150">
                    <Link
                      href={`/game/${gameNumber}`}
                      className="flex items-center justify-center h-full text-primary"
                    ></Link>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {gameNumber}
                  </span>
                  <span className="text-xs text-primary">{date}</span>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
