
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <div className={cn("relative h-11 w-px bg-edge", className)}>
    </div>
  );
}
