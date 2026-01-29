import CornerDecorations from "@/components/common/CornerDecorations";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  withCornerDecorators?: boolean;
}

export default function Divider({
  className,
  withCornerDecorators = false,
}: DividerProps) {
  return (
    <div className={cn("relative h-11 w-px bg-edge", className)}>
      {withCornerDecorators && <CornerDecorations />}
    </div>
  );
}
