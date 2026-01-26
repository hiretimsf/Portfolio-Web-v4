import BackgroundDots from "@/components/common/BackgroundDots";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  gridId: string;
  className?: string; // class for BackgroundDots
  containerClassName?: string; // class for the container div
}

export default function Section({
  children,
  gridId,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <div className={cn("relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8", containerClassName)}>
      <BackgroundDots gridId={gridId} className={cn("text-gray-200/80", className)} />
      {children}
    </div>
  );
}