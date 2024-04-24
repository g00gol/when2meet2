import { redirect } from "next/navigation";
import clientPromise from "../_lib/mongodb";
import { getDb } from "../_lib/mongodb";

export async function getEvent(id) {
  try {
    const client = await clientPromise;
    const db = getDb(client);
    const eventsCol = db.collection("events");

    const event = await eventsCol.findOne({
      _id: id,
    });

    return event;
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while fetching the event." };
  }
}

export async function createEvent(event) {
  try {
    const client = await clientPromise;
    const db = getDb(client);
    const eventsCol = db.collection("events");

    // Insert the event into the database
    var { insertedId } = await eventsCol.insertOne(event);
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while creating the event." };
  }

  return redirect(`/meet/${insertedId.toString()}`);
}
