import { Separator } from "@/components/ui/separator";
import DotsBackground from "@/components/common/BackgroundDots";
import CompanyLocation from "./CompanyLocation";
import CompanyLogo from "./CompanyLogo";
import CompanyName from "./CompanyName";
import CompanyWebsite from "./CompanyWebsite";

interface CompanyMainProps {
  companyLogo: string;
  companyLogoAlt: string;
  companyName: string;
  companyLocation: string;
  companyWebsite: string;
  country: string;
}

export default function CompanyMain({
  companyLogo,
  companyLogoAlt,
  companyName,
  companyLocation,
  companyWebsite,
  country,
}: CompanyMainProps) {
  return (
    <div className="relative flex flex-col items-center gap-3 border-b border-black/10 dark:border-white/10 border-dashed px-6 py-6 md:flex-row md:px-8 md:py-4">
      <CompanyLogo
        companyLogo={companyLogo}
        companyLogoAlt={companyLogoAlt}
        companyName={companyName}
      />
      <div className="flex flex-col items-center gap-2 md:items-start md:gap-1">
        <CompanyName companyName={companyName} />
        <div className="text-foreground/80 flex items-center gap-2 text-sm">
          <CompanyLocation
            companyLocation={companyLocation}
            country={country}
          />
          {companyLocation && companyWebsite && (
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
          )}
          <CompanyWebsite companyWebsite={companyWebsite} />
        </div>
      </div>
      <DotsBackground
        gridId="company-main"
        className="text-gray-200/80"
        fadeBottomMask
      />
    </div>
  );
}
