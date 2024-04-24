import { useState } from "react";
import Week from "@/app/components/Home/Week";
import Month from "@/app/components/Home/Month";

export default function CreateEvent() {
  const [meetingPattern, setMeetingPattern] = useState("week");
  const [selectedDays, setSelectedDays] = useState([]);

  function handleMeetingPatternChange(event) {
    setMeetingPattern(event.target.value);
  }

  return (
    <form
      method="POST"
      action="/api/event"
      className="flex w-fit flex-col space-y-6 rounded-md border border-neutral bg-neutral p-8"
    >
      <span className="space-x-2">
        <label>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Event Name"
          />
        </label>
        <label>
          <select
            name="meeting_pattern"
            className="select"
            onChange={(e) => handleMeetingPatternChange(e)}
            value={meetingPattern}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
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
  );
}
