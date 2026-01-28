import Image from "next/image";
import { getShimmerDataUrl } from "@/lib/utils";

export function ProjectImage({
  imageUrl,
  imageAlt,
}: {
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <Image
      alt={imageAlt}
      src={imageUrl}
      width={80}
      height={80}
      className="size-24 rounded-md object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 128px"
      priority
      placeholder="blur"
      blurDataURL={getShimmerDataUrl(80, 80)}
    />
  );
}
