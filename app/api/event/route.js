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
    if (!days.length) {
      return redirect("/?error=Must select at least 1 day.");
    }
    const id = await createEvent({ name, meeting_pattern, days });
    return Response.json(id);
  }
}
