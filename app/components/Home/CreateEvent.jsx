import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Week from "@/app/components/Home/Week";
import Month from "@/app/components/Home/Month";

export default function CreateEvent() {
  const errorParams = useSearchParams();
  const error = errorParams.get("error");

  const [meetingPattern, setMeetingPattern] = useState("week");
  const [selectedDays, setSelectedDays] = useState([]);

  function handleMeetingPatternChange(event) {
    setMeetingPattern(event.target.value);
  }

  return (
    <>
      <form
        method="POST"
        action="/api/event"
        className="flex h-screen w-screen flex-col space-y-6 rounded-md border border-neutral bg-neutral p-8 lg:h-auto lg:w-fit"
      >
        <span className="space-y-2 lg:space-x-2">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Event Name"
          />
          <select
            name="meeting_pattern"
            className="select"
            onChange={(e) => handleMeetingPatternChange(e)}
            value={meetingPattern}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </span>
        {meetingPattern === "week" ? (
          <Week selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        ) : (
          meetingPattern === "month" && <Month />
        )}
        <button className="btn" type="submit">
          Create
        </button>
      </form>

      {error && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
}
