"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ViewTracker({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    // Fire and forget view increment
    fetch(`/api/views/${slug}`, {
      method: "POST",
    })
      .then(() => {
        router.refresh();
      })
      .catch(console.error);
  }, [slug, router]);

  return null;
}
