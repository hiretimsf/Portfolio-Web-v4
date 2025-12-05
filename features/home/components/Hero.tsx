import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SKILLS } from "@/features/home/data/skills";
import { cn } from "@/lib/utils";
import type { ListItemType } from "@/features/home/types/ListItem";
import Link from "next/link";
import { IoCheckmarkCircle as CheckmarkIcon } from "react-icons/io5";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import {
  Effect,
} from "@/components/animate-ui/primitives/effects/effect";

function HeroContent() {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 divide-y divide-dashed divide-border-edge">
      <Effect
        inView={true}
        fade={true}
        slide={{ direction: "up", offset: 10 }}
        delay={100}
      >
        <p className="text-foreground px-4 text-2xl font-semibold tracking-tight sm:text-left sm:text-3xl hidden sm:block pb-2">
          HELLO
        </p>
      </Effect>
      <Effect
        inView={true}
        fade={true}
        slide={{ direction: "up", offset: 10 }}
        delay={200}
      >
        <h1 className="text-foreground px-4 text-4xl font-semibold tracking-tight sm:text-5xl sm:text-left py-4">
          <span className="sm:hidden">Hello, </span>
          I&apos;m Tim
        </h1>
      </Effect>

      <Effect
        inView={true}
        fade={true}
        slide={{ direction: "up", offset: 10 }}
        delay={300}
      >
        <p className="text-foreground/80 px-4 text-lg/8 font-mono text-left py-4">
          I&apos;m a Design Engineer and Frontend Developer based in the San
          Francisco Bay Area. I help people solve real-world problems by
          building web and mobile apps.
        </p>
      </Effect>

      <ul
        className="text-foreground space-y-2 divide-y divide-dashed divide-border-edge"
        aria-label="Skills and qualifications"
      >
        {SKILLS.map((item: ListItemType, index: number) => {
          const itemId = item.name ? `${item.name}-${index}` : `item-${index}`;

          return (
            <Effect
              key={itemId}
              inView={true}
              fade={true}
              slide={{ direction: "up", offset: 10 }}
              delay={400 + index * 50}
              asChild
            >
              <li className="relative pl-11 last:mb-0 py-2">
                <CheckmarkIcon
                  aria-hidden="true"
                  className={cn(
                    "absolute left-4 size-5 text-muted-foreground/80",
                    "top-1/2 -translate-y-1/2"
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
            </Effect>
          );
        })}
      </ul>

      <Effect
        inView={true}
        fade={true}
        slide={{ direction: "up", offset: 10 }}
        delay={600}
      >
        <div className="px-4 text-left py-4">
          <Button asChild>
            <Shine className="w-full sm:w-fit py-4 px-6">
              <Link href="/about">Learn More</Link>
            </Shine>
          </Button>
        </div>
      </Effect>
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
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-2 gap-x-6 border border-dashed border-border-edge">
          <div className="col-span-1">
            <Image
              alt={imageAlt}
              src={imageSrcDesktop}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="col-span-1 flex items-center border-l border-dashed border-border-edge">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="relative mx-auto flex flex-col lg:hidden">
        <Image
          alt={imageAlt}
          src={imageSrcMobile}
          width={1000}
          height={500}
          className="w-full"
          priority
        />
        <HeroContent />
      </div>
    </>
  );
}
