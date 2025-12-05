import { cn } from "@/lib/utils";
import type { ExperienceItemType } from "@/types";

type CompanyLocationProps = Pick<
  ExperienceItemType,
  "companyLocation" | "country"
> & {
  className?: string;
};

export default function CompanyLocation({
  className,
  companyLocation,
  country,
}: CompanyLocationProps) {
  const CountryFlag = country;

  if (!companyLocation && !CountryFlag) {
    return null;
  }

  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center gap-1.5 text-base",
        className,
      )}
    >
      {CountryFlag && (
        <span className="flex items-center">
          <CountryFlag className="size-4" aria-hidden="true" />
        </span>
      )}
      {companyLocation && <span>{companyLocation}</span>}
    </div>
  );
}
