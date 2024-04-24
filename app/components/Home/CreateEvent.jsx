import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Week from "@/app/components/Home/Week";
import Month from "@/app/components/Home/Month";
import Link from "next/link";

export default function CreateEvent() {
  const errorParams = useSearchParams();
  const error = errorParams.get("error");

  const [meetingPattern, setMeetingPattern] = useState("week");
  const [selectedDays, setSelectedDays] = useState([]);

  function handleMeetingPatternChange(event) {
    setMeetingPattern(event.target.value);
  }

  // Make an object where key is the military time and value is the human readable time
  const times = {
    "00:00": "12:00 AM",
    "00:30": "12:30 AM",
    "01:00": "1:00 AM",
    "01:30": "1:30 AM",
    "02:00": "2:00 AM",
    "02:30": "2:30 AM",
    "03:00": "3:00 AM",
    "03:30": "3:30 AM",
    "04:00": "4:00 AM",
    "04:30": "4:30 AM",
    "05:00": "5:00 AM",
    "05:30": "5:30 AM",
    "06:00": "6:00 AM",
    "06:30": "6:30 AM",
    "07:00": "7:00 AM",
    "07:30": "7:30 AM",
    "08:00": "8:00 AM",
    "08:30": "8:30 AM",
    "09:00": "9:00 AM",
    "09:30": "9:30 AM",
    "10:00": "10:00 AM",
    "10:30": "10:30 AM",
    "11:00": "11:00 AM",
    "11:30": "11:30 AM",
    "12:00": "12:00 PM",
    "12:30": "12:30 PM",
    "13:00": "1:00 PM",
    "13:30": "1:30 PM",
    "14:00": "2:00 PM",
    "14:30": "2:30 PM",
    "15:00": "3:00 PM",
    "15:30": "3:30 PM",
    "16:00": "4:00 PM",
    "16:30": "4:30 PM",
    "17:00": "5:00 PM",
    "17:30": "5:30 PM",
    "18:00": "6:00 PM",
    "18:30": "6:30 PM",
    "19:00": "7:00 PM",
    "19:30": "7:30 PM",
    "20:00": "8:00 PM",
    "20:30": "8:30 PM",
    "21:00": "9:00 PM",
    "21:30": "9:30 PM",
    "22:00": "10:00 PM",
    "22:30": "10:30 PM",
    "23:00": "11:00 PM",
    "23:30": "11:30 PM",
  };

  return (
    <>
      <form
        method="POST"
        action="/api/event"
        className="flex h-screen w-screen flex-col justify-between rounded-md border border-neutral bg-neutral p-8 lg:h-auto lg:w-fit lg:space-y-6"
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
            <option disabled value="month">
              Month
            </option>
          </select>
        </span>
        {meetingPattern === "week" ? (
          <>
            <Week
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
            <span className="flex items-center space-x-2">
              <select className="select" name="start_time">
                {Object.entries(times).map((time) => (
                  <option key={time[0]} value={time[0]}>
                    {time[1]}
                  </option>
                ))}
              </select>
              <p>to</p>
              <select className="select" name="end_time">
                {Object.entries(times).map((time) => (
                  <option key={time[0]} value={time[0]}>
                    {time[1]}
                  </option>
                ))}
              </select>
            </span>
          </>
        ) : (
          meetingPattern === "month" && <Month />
        )}
        <button className="btn" type="submit">
          Create
        </button>
      </form>

      {error && (
        <Link href="/" className="toast toast-end">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </Link>
      )}
    </>
  );
}
