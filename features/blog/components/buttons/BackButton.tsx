"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className="h-7 gap-1.5 py-4 border border-border-edge rounded-md px-3 text-sm font-sans font-medium active:scale-none disabled:pointer-events-none disabled:opacity-50"
      onClick={() => router.push("/blog")}
    >
      <ArrowLeftIcon className="size-4" />
      Back
    </Button>
  );
};

export default BackButton;
