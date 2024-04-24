import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import clientPromise from "../_lib/mongodb";
import { getDb } from "../_lib/mongodb";

export async function getEvent(id) {
  try {
    const client = await clientPromise;
    const db = getDb(client);
    const eventsCol = db.collection("events");

    const event = await eventsCol.findOne({ _id: new ObjectId(id) });
    if (!event) throw { _code: 404, message: "Event not found" };

    return event;
  } catch (e) {
    throw e;
  }
}

export async function createEvent(event) {
  try {
    const client = await clientPromise;
    const db = getDb(client);
    const eventsCol = db.collection("events");

    var { insertedId } = await eventsCol.insertOne(event);
  } catch (e) {
    console.error(e);
    return { error: e };
  }

  return redirect(`/event/${insertedId.toString()}`);
}
