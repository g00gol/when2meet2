/* Make a selectable grid that lets users select different 30 minute increments by dragging over it or selecting one cell at a time */

import { useEffect, useState } from "react";

export default function Schedule({ event }) {
  const [selecting, setSelecting] = useState(false);
  const [deselecting, setDeselecting] = useState(false);
  const [times, setTimes] = useState([]);

  // end_time - start_time # of 30 minute increments in a day. Create an array with start_time to end_time in 30 minute increments. start_time and end_time are in format HH:MM AM/PM
  const start_time = new Date(`2021-01-01T${event.start_time}`);
  const end_time = new Date(`2021-01-01T${event.end_time}`);
  const _times = Array.from(
    { length: (end_time - start_time) / 1800000 + 1 },
    (_, i) => {
      const time = new Date(start_time.getTime() + i * 1800000);
      return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    },
  );

  function selectTime(time) {
    if (selecting) {
      setTimes([...times, time]);
    } else if (deselecting) {
      setTimes(times.filter((t) => t !== time));
    }
  }

  function startSelectTime(time) {
    if (!times.includes(time)) {
      setTimes([...times, time]);
      setSelecting(true);
      setDeselecting(false);
    } else {
      setTimes(times.filter((t) => t !== time));
      setSelecting(false);
      setDeselecting(true);
    }
  }

  function stopSelectTime() {
    setSelecting(false);
    setDeselecting(false);
  }

  useEffect(() => {
    console.log(times);
  }, [times]);

  const days = ["", ...event?.days];
  if (event?.meeting_pattern === "week")
    return (
      <div
        className="flex h-fit w-fit"
        onMouseUp={() => stopSelectTime()}
        onTouchEnd={() => stopSelectTime()}
      >
        {days.map((day) => (
          <div key={day} className="grid-cols-48 grid border border-base-300">
            {day === "" &&
              _times.map((time) => (
                <p
                  key={time}
                  className="h-6 border border-dashed border-base-100"
                >
                  {time}
                </p>
              ))}
            {day !== "" &&
              _times.map((time) => {
                const day_time = `${day}_${time}`;

                return (
                  <button
                    key={day_time}
                    className={
                      "h-6 w-20 border border-dashed border-base-100" +
                      (selecting ? " lg:hover:!bg-primary/20" : "") +
                      (deselecting ? " lg:hover:!bg-secondary/20" : "") +
                      (times.includes(day_time)
                        ? " bg-primary/40 lg:hover:bg-secondary/20"
                        : " bg-base-300 lg:hover:bg-primary/20")
                    }
                    onMouseDown={() => startSelectTime(day_time)}
                    onMouseOver={() => selectTime(day_time)}
                    onMouseUp={() => stopSelectTime()}
                  >
                    {" "}
                  </button>
                );
              })}
            {day}
          </div>
        ))}
      </div>
    );
}
