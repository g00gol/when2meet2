"use client";

import useFetch from "@/app/_lib/useFetch";
import { useEffect } from "react";

export default function Event(params) {
  const { id } = params;

  const { data, error, loading } = useFetch(`/api/event/${id}`);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Event {id}</div>;
}
