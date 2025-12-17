import Image, { getImageProps } from "next/image";
import { Button } from "@/components/ui/button";
import { SKILLS } from "@/features/home/data/skills";
import { cn } from "@/lib/utils";
import type { SkillType } from "@/features/home/types/SkillType";
import Link from "next/link";
import { IoCheckmarkCircle as CheckmarkIcon } from "react-icons/io5";

function HeroContent() {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 divide-y divide-dashed divide-border-edge">
      <p className="text-foreground px-4 text-2xl font-semibold tracking-tight sm:text-left sm:text-3xl hidden sm:block pb-2">
        HELLO
      </p>
      <h1 className="text-foreground px-4 text-4xl font-semibold tracking-tight sm:text-5xl sm:text-left py-4">
        <span className="sm:hidden">Hello, </span>
        I&apos;m Tim
      </h1>

      <p className="text-foreground/80 px-4 text-lg/8 text-left py-4">
        I&apos;m a Frontend Developer based in the San Francisco Bay Area. I
        help people solve real-world problems by building web and mobile apps.
      </p>

      <ul
        className="text-foreground space-y-2 divide-y divide-dashed divide-border-edge"
        aria-label="Skills and qualifications"
      >
        {SKILLS.map((item: SkillType, index: number) => {
          const itemId = item.name ? `${item.name}-${index}` : `item-${index}`;

          return (
            <li key={itemId} className="relative pl-11 last:mb-0 py-2">
              <CheckmarkIcon
                aria-hidden="true"
                className={cn(
                  "absolute left-4 size-5 text-muted-foreground/80",
                  "top-1/2 -translate-y-1/2",
                )}
              />
              <div className="flex flex-row gap-x-1">
                {item.name && (
                  <span className="text-foreground font-semibold">
                    {item.name}:
                  </span>
                )}
                <span className="text-foreground/80">{item.description}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="px-4 text-left py-4">
        <Button asChild>
          <Link href="/about" className="w-full sm:w-fit py-4 px-6">
            Learn more about Tim
          </Link>
        </Button>
      </div>
    </div>
  );
}

type HeroProps = {
  imageSrcDesktop: string;
  imageSrcMobile: string;
  imageAlt: string;
};

export default function Hero({
  imageSrcDesktop,
  imageSrcMobile,
  imageAlt,
}: HeroProps) {
  const common = { alt: imageAlt, priority: true };

  const {
    props: { srcSet: desktopSrcSet, ...restDesktop },
  } = getImageProps({
    ...common,
    width: 1000,
    height: 800,
    src: imageSrcDesktop,
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    width: 600,
    height: 400,
    src: imageSrcMobile,
  });

  return (
    <div className="mx-auto max-w-5xl lg:p-8">
      <div className="flex flex-col border-border-edge lg:grid lg:grid-cols-2 lg:gap-x-6 lg:border lg:border-dashed">
        {/* Image Section */}
        <div className="w-full lg:col-span-1">
          <picture>
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
            <source media="(max-width: 1023px)" srcSet={mobileSrcSet} />
            <img
              {...restDesktop}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full object-cover lg:h-full"
              alt={imageAlt}
            />
          </picture>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-1 lg:flex lg:items-center lg:border-l lg:border-dashed lg:border-border-edge">
          <HeroContent />
        </div>
      </div>
    </div>
  );
}
