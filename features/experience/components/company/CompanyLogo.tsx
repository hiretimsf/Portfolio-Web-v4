import Image from "next/image";
import { cn, getShimmerDataUrl } from "@/lib/utils";

type CompanyLogoProps = {
  className?: string;
  companyLogo?: string;
  companyLogoAlt?: string;
  companyName: string;
};

export default function CompanyLogo({
  className,
  companyLogo,
  companyLogoAlt,
  companyName,
}: CompanyLogoProps) {
  if (!companyLogo) {
    return null;
  }

  return (
    <Image
      src={companyLogo}
      alt={companyLogoAlt || companyName}
      width={64}
      height={64}
      priority
      className={cn(
        "size-20 rounded-lg bg-background corner-squircle border border-black/10 dark:border-white/10 object-contain p-1 md:size-16",
        className,
      )}
      sizes="(max-width: 768px) 64px, (max-width: 1200px) 64px, 64px"
      placeholder="blur"
      blurDataURL={getShimmerDataUrl(64, 64)}
    />
  );
}
