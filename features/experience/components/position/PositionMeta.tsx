import {
  CalendarIcon,
  ClockIcon,
} from "@/components/common/Icons";
import BriefcaseIcon from "@/features/experience/icons/briefcase-icon";

interface PositionMetaProps {
  employmentType: string;
  employmentPeriod: string;
  employmentDuration: string;
}

export default function PositionMeta({
  employmentType,
  employmentPeriod,
  employmentDuration,
}: PositionMetaProps) {
  const metaItems = [
    {
      icon: <BriefcaseIcon className="size-4" />,
      value: employmentType,
    },
    {
      icon: <CalendarIcon className="size-4" />,
      value: employmentPeriod,
    },
    {
      icon: <ClockIcon className="size-4" />,
      value: employmentDuration,
    },
  ];

  return (
    <div className="mx-auto flex w-full flex-col divide-y divide-border-edge divide-dashed border border-border-edge border-dashed text-center md:mx-0 md:flex-row md:divide-x md:divide-y-0 md:text-left">
      {metaItems.map(({ icon, value }, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: meta items are static
          key={index}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-center font-mono text-muted-foreground text-sm text-balance md:text-left tracking-tight ${
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
