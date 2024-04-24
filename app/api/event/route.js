import { createEvent, getEvent } from "./data";

export async function GET(req) {
  // Get the query string parameters
  const { id } = req.params;

  const events = await getEvent(id);
  return Response.json(events);
}

export async function POST(req) {
  const data = await req.formData();

  const name = data.get("name");
  const meeting_pattern = data.get("meeting_pattern");
  if (meeting_pattern === "week") {
    const days = data.getAll("days");
    const id = await createEvent({ name, meeting_pattern, days });
    return Response.json(id);
  }
}
