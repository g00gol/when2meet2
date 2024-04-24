"use client";
import AvailabilityGrid from "@/app/components/Event/Schedule";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Event({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`/api/event/${id}`);
        res = await res.json();
        if (res.error) throw res.error;

        setEvent(res);
      } catch (e) {
        setError(e || "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <Link href="/" className="toast toast-end">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </Link>
    );

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="h-screen w-fit space-y-6 rounded-md border border-neutral bg-neutral p-8 lg:h-auto lg:w-auto">
        <span>
          <Link href="/">Back</Link>
          <h1 className="text-3xl">Event: {event.name}</h1>
        </span>
        <form>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Your Name"
          />
        </form>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Mine"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <AvailabilityGrid event={event} />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="All"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <AvailabilityGrid event={event} />
          </div>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </main>
  );
}
