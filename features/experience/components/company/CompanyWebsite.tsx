import { ArrowUpRight } from "lucide-react";
import GlobeIcon from "@/icons/globe-icon";
import { cn } from "@/lib/utils";

type CompanyWebsiteProps = {
  className?: string;
  companyWebsite?: string | null;
};

export default function CompanyWebsite({
  className,
  companyWebsite,
}: CompanyWebsiteProps) {
  if (!companyWebsite) {
    return null;
  }

  const formattedWebsite = companyWebsite
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  if (!formattedWebsite) {
    return null;
  }

  return (
    <dl
      className={cn(
        "text-muted-foreground flex items-center justify-center gap-1.5 text-base",
        className,
      )}
    >
      <dt className="sr-only">Website</dt>
      <dd className="flex items-center justify-center gap-1.5 align-middle">
        <GlobeIcon className="size-4 align-middle" aria-hidden="true" />
        <a
          href={companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-muted-foreground inline-flex items-center gap-1 hover:text-foreground hover:underline hover:underline-offset-4"
        >
          Website
          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4" />
        </a>
      </dd>
    </dl>
  );
}
