import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "@/components/common/Icons";

interface PositionMetaProps {
  employmentType: string;
  employmentPeriod: string;
  employmentDuration: string;
}

/**
 * Formats employment period from "Jan,2023-Oct,2023" to "01/2023-10/2023"
 * Handles different dash types: hyphen (-), em dash (—), en dash (–)
 */
function formatEmploymentPeriod(period: string): string {
  const monthMap: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04",
    may: "05", jun: "06", jul: "07", aug: "08",
    sep: "09", oct: "10", nov: "11", dec: "12",
  };

  // Split by various dash types (hyphen, em dash, en dash)
  const parts = period.split(/[-—–]/);
  
  const formatPart = (part: string): string => {
    const trimmed = part.trim();
    // Handle "Present" or "present"
    if (trimmed.toLowerCase() === "present") return "Present";
    
    // Split by comma to get month and year
    const [month, year] = trimmed.split(",").map(s => s.trim());
    if (!month || !year) return trimmed;
    
    const monthNum = monthMap[month.toLowerCase()];
    return monthNum ? `${monthNum}/${year}` : trimmed;
  };

  return parts.map(formatPart).join(" - ");
}

export default function PositionMeta({
  employmentType,
  employmentPeriod,
  employmentDuration,
}: PositionMetaProps) {
  const metaItems = [
    {
      icon: <UserIcon className="size-4" />,
      value: employmentType,
    },
    {
      icon: <CalendarIcon className="size-4" />,
      value: formatEmploymentPeriod(employmentPeriod),
    },
    {
      icon: <ClockIcon className="size-4" />,
      value: employmentDuration,
    },
  ];

  return (
    <div className="mx-auto flex w-full flex-col divide-y divide-black/10 dark:divide-white/10 divide-dashed border border-black/10 dark:border-white/10 border-dashed text-center md:mx-0 md:flex-row md:divide-x md:divide-y-0 md:text-left">
      {metaItems.map(({ icon, value }, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: meta items are static
          key={index}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-center text-muted-foreground text-sm text-balance md:text-left ${
            index === 0 ? "md:pl-5 tracking-tight" : ""
          }`}
        >
          {icon}
          {value}
        </div>
      ))}
    </div>
  );
}
