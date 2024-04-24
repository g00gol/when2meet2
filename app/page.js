"use client";

import CreateEvent from "@/app/components/Home/CreateEvent";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense>
        <CreateEvent />
      </Suspense>
    </main>
  );
}
