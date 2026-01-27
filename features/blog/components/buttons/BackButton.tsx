"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className="h-7 gap-1.5 py-4 border border-black/10 dark:border-white/10 corner-squircle rounded-xl border-dashed px-3 text-sm font-sans font-medium active:scale-none disabled:pointer-events-none disabled:opacity-50 hover:bg-black/5 dark:hover:bg-white/5"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <ArrowLeftIcon className="size-4" />
      Back
    </Button>
  );
};

export default BackButton;
