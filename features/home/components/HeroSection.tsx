"use client";

import { Button } from "@/components/ui/button";  
import { Compare } from "@/components/ui/compare";
import Section from "@/components/layout/main/Section";
import { SKILLS } from "@/features/home/data/source";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle as CheckmarkIcon } from "react-icons/io5";
import BrowserWrapper from "@/components/common/BrowserWrapper";

// --- Hero Component ---

function HeroContent() {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 divide-y divide-dashed divide-black/10 dark:divide-white/10">
      
      <p className="text-foreground px-4 py-2 text-2xl font-semibold tracking-tight sm:text-left sm:text-3xl hidden sm:block">
        HELLO
      </p>
      <h1 className="text-foreground px-4 text-[32px] font-semibold tracking-tight sm:text-[40px] sm:text-left py-2">
        <span className="sm:hidden">Hello, </span>
        I&apos;m Tim
      </h1>

      <p className="text-foreground/80 px-4 text-[18px] text-left py-4 leading-[32px] text-pretty">
        I&apos;m a Frontend Developer based in the San Francisco Bay Area. I
        help people solve real-world problems by building web and mobile apps.
      </p>

      <ul
        className="text-foreground space-y-2 divide-y divide-dashed divide-black/10 dark:divide-white/10"
        aria-label="Skills and qualifications"
      >
        {SKILLS.map((item, index) => (
          <li
            key={item.name || index}
            className="relative py-2 pl-11 last:mb-0"
          >
            <CheckmarkIcon
              aria-hidden="true"
              className={cn(
                "absolute left-4 size-5 text-green-500",
                "top-1/2 -translate-y-1/2",
              )}
            />
            <div className="flex flex-row gap-x-1">
              {item.name && (
                <span className="font-semibold text-foreground text-[14px] sm:text-[16px]">
                  {item.name}:
                </span>
              )}
              <span className="text-foreground/80 text-[14px] sm:text-[16px]">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 py-4 text-left">
        <Button asChild>
          <Link href="/about" className="w-full px-6 py-5 sm:w-auto text-[16px] font-semibold">
            Learn more about Tim
          </Link>
        </Button>
      </div>
    </div>
  );
}

type HeroProps = {
  imageSrcDesktop?: string;
  imageSrcDesktopDark?: string;
  imageSrcMobile?: string;
  imageSrcMobileDark?: string;
  imageAlt?: string;
};

const DEFAULT_IMAGES = {
  desktop: "/images/home/vertical-profile.jpg",
  desktopDark: "/images/home/vertical-profile-dark.jpg",
  mobile: "/images/home/horizontal-profile.jpg",
  mobileDark: "/images/home/horizontal-profile-dark.jpg",
  alt: "Professional headshot of Tim, a Frontend Developer based in San Francisco Bay Area",
};

export default function HeroSection({
  imageSrcMobile = DEFAULT_IMAGES.mobile,
  imageSrcMobileDark = DEFAULT_IMAGES.mobileDark,
  imageAlt = DEFAULT_IMAGES.alt,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Section gridId="hero">
      <BrowserWrapper>  
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6 bg-background">
        
        {/* Image Section */}
        <div className="w-full lg:col-span-1">
          
          {/* Desktop Image */}
          <div className="hidden lg:block relative h-full w-full">
            <Compare
              firstImage={
                isDark
                  ? "/images/home/profile-vertical-dark-after.jpg"
                  : "/images/home/profile-vertical-light-after.jpg"
              }
              secondImage={
                isDark
                  ? "/images/home/profile-vertical-dark-before.jpg"
                  : "/images/home/profile-vertical-light-before.jpg"
              }
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="h-full w-full"
              slideMode="drag"
              autoplay={false}
            />
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden relative w-full">
            <Image
              src={isDark ? imageSrcMobileDark : imageSrcMobile}
              alt={imageAlt}
              width={600}
              height={400}
              priority
              className="h-auto w-full object-cover aspect-4/3 md:aspect-auto"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="relative lg:col-span-1 lg:flex lg:items-center lg:border-l lg:border-dashed lg:border-black/10 dark:border-white/10">
          <HeroContent />
        </div>
      </div>
      </BrowserWrapper>
    </Section>
  );
}
