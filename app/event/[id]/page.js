"use client";
import axios from "axios";
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
      <div className="toast toast-end">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );

  return <div>Event {id}</div>;
}
