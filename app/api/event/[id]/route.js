import { getEvent } from "../data";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const event = await getEvent(id);
    return Response.json(event);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e?.message ?? e.toString() },
      { status: e._code || 500 },
    );
  }
}
