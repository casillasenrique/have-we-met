import React from "react";
import Link from "next/link";

const DAYS_IN_WEEK = 7;
const DAYS_IN_WEEK_STRINGS = ["s", "m", "t", "w", "th", "f", "s"];

export default function Archive() {
  const today = new Date();
  const totalGames = 100; // TODO: Replace with the actual number of games in the archive
  const archiveDays = Array.from({ length: totalGames }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return {
      dateString: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      dayOfWeekIdx: date.getDay(),
      gameNumber: totalGames - index, // Game numbers count down from totalGames
    };
  });

  const emptyDay = { dateString: "", gameNumber: 0, dayOfWeekIdx: 0 };

  // We might not be done with the latest week, so fill it with placeholders.
  // For example, if today is a Thursday, we need empty slots for Friday, Saturday, and Sunday
  const firstDayOfWeekIdx = archiveDays[0].dayOfWeekIdx;
  const daysLeftInWeek = DAYS_IN_WEEK - firstDayOfWeekIdx - 1;
  console.log(
    `First day of the week index: ${firstDayOfWeekIdx}, ${daysLeftInWeek} days left in the week`
  );
  for (let i = 0; i < daysLeftInWeek; i++) {
    archiveDays.unshift(emptyDay);
  }

  // Create an array of weeks so we can display them in the grid correctly
  // Each week will have 7 days, and we reverse the order so the most recent day is on the left
  const weeks = [];
  for (let i = 0; i < archiveDays.length; i += DAYS_IN_WEEK) {
    const week = archiveDays.slice(i, i + DAYS_IN_WEEK);

    // The last week might not have 7 days, so fill it with empty days
    while (week.length < DAYS_IN_WEEK) {
      week.push(emptyDay);
    }
    weeks.push(week.reverse());
  }

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-1">Play the archive</h1>
      <p className="text-sm text-gray-600 mb-6">
        Click on a circle to guess the MET object of that day
      </p>
      <div className="grid grid-cols-7 gap-4 text-center">
        {/* Days of the week */}
        {DAYS_IN_WEEK_STRINGS.map((day, index) => (
          <div key={index} className="text-xl font-bold text-primary">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map(({ dateString, gameNumber }, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className="flex flex-col items-center"
            >
              {gameNumber === 0 ? (
                // Placeholder for empty days
                <div className="w-10 h-10 border-2 border-gray-300 rounded-full mb-1"></div>
              ) : (
                // Game circle with link to game page
                <Link
                  href={`/game/${gameNumber}`}
                  className="flex flex-col items-center w-full"
                >
                  <div className="w-10 h-10 border-2 border-primary rounded-full mb-1 hover:bg-primary transition-colors duration-150"></div>
                  <span className="text-xs font-bold text-primary">
                    {gameNumber}
                  </span>
                  <span className="text-xs text-primary">{dateString}</span>
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
