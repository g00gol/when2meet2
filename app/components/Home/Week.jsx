import { useState, useEffect } from "react";

/**
 * Allows the user to select which day(s) of the week.
 * @returns {JSX.Element} The component to be rendered.
 */

export default function Week({ selectedDays, setSelectedDays }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    console.log(selectedDays);
  }, [selectedDays]);

  function handleDayClick(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day),
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  return (
    <div className="join join-vertical lg:join-horizontal">
      {days.map((day) => (
        <input
          name="days"
          onClick={() => handleDayClick(day)}
          value={day}
          key={day}
          type="checkbox"
          className="btn join-item"
          aria-label={day}
        />
      ))}
    </div>
  );
}
