import { redirect } from "next/navigation";
import { createEvent } from "./data";

export async function POST(req) {
  const data = await req.formData();

  const name = data.get("name");
  const meeting_pattern = data.get("meeting_pattern");
  if (!name || !meeting_pattern) {
    return redirect("/?error=Missing name or meeting pattern.");
  }

  if (meeting_pattern === "week") {
    const days = data.getAll("days");
    const start_time = data.get("start_time");
    const end_time = data.get("end_time");
    if (!days.length) {
      return redirect("/?error=Must select at least 1 day.");
    }
    if (!start_time || !end_time) {
      return redirect("/?error=Must select start and end times.");
    }
    const id = await createEvent({
      name,
      meeting_pattern,
      days,
      start_time,
      end_time,
    });
    return Response.json(id);
  }
}
