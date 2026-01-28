import { calculateDuration, formatDate } from "@/lib/utils";
import PositionDescription from "./PositionDescription";
import PositionMeta from "./PositionMeta";
import PositionPosition from "./PositionPosition";
import PositionSkills from "./PositionSkills";

interface PositionMainProps {
  employmentType: string;
  employmentPeriod?: string;
  employmentDuration?: string;
  fromDate?: string;
  toDate?: string;
  description: string;
  skills: string[];
  icon: string;
  title: string;
}

export default function PositionMain({
  employmentType,
  employmentPeriod,
  employmentDuration,
  fromDate,
  toDate,
  description,
  skills,
  icon,
  title,
}: PositionMainProps) {
  // Calculate period and duration from ISO dates if provided
  const period = fromDate && toDate
    ? `${formatDate(fromDate, "MM/yyyy")} - ${toDate.toLowerCase() === "present" ? "Present" : formatDate(toDate, "MM/yyyy")}`
    : employmentPeriod || "";
    
  const duration = fromDate && toDate
    ? calculateDuration(fromDate, toDate)
    : employmentDuration || "";

  return (
    <div className="flex flex-col px-6 md:px-8">
      <PositionPosition icon={icon} title={title} />
      <PositionMeta
        employmentType={employmentType}
        employmentPeriod={period}
        employmentDuration={duration}
      />
      <PositionDescription description={description} hasSkills={skills.length > 0} />
      <PositionSkills skills={skills} />
    </div>
  );
}
