"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/layout/main/Section";
import { SKILLS } from "@/features/home/data/source";
import { cn } from "@/lib/utils";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import Link from "next/link";
import { IoCheckmarkCircle as CheckmarkIcon } from "react-icons/io5";
import BrowserWrapper from "@/components/common/BrowserWrapper";

function HeroContent() {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 divide-y divide-dashed divide-black/10 dark:divide-white/10">
      <h1 className="text-foreground px-4 text-[32px] font-semibold tracking-tight sm:text-[40px] sm:text-left py-2">
        Hello, I&apos;m Tim
      </h1>

      <p className="text-foreground/80 px-4 text-[16px] text-left py-4 leading-[32px] text-pretty">
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
            <div className="flex flex-row gap-x-1 items-center flex-wrap">
              {item.name && (
                <span className="font-semibold text-foreground text-[14px] sm:text-[16px]">
                  {item.name}:
                </span>
              )}
              {item.icons || Array.isArray(item.description) ? (
                <span className="text-foreground/80 text-[14px] sm:text-[16px] inline-flex items-center flex-wrap [&>*:not(:first-child)]:ml-2">
                  &nbsp;
                  {Array.isArray(item.description)
                    ? item.description.map((part, i) => (
                        <span
                          key={i}
                          className={cn("inline-flex items-center gap-x-0.5", part.className)}
                        >
                          {part.icon && <part.icon className="size-4" />}
                          <span className="text-foreground">{part.text}</span>
                        </span>
                      ))
                    : item.description}
                  {item.icons?.map((Icon, i) => (
                    <span key={i} className="inline-flex items-center ml-1">
                      <Icon className="size-4 text-foreground/80" />
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-foreground/80 text-[14px] sm:text-[16px]">
                  {item.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 py-4 text-left">
        <div className="flex flex-col gap-6">
          <Button asChild className="w-full sm:w-fit">
            <Link
              href="/about"
              className="px-6 py-5 text-[16px] font-semibold w-full sm:w-auto"
            >
              Learn more about Tim
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}



export default function HeroSection() {
  return (
    <Section gridId="hero">
      <BrowserWrapper>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6 bg-background">
          {/* Image Section */}
          <div className="w-full lg:col-span-1">
            {/* Desktop Image */}
            <div className="hidden lg:block relative h-full w-full">
              <ImageWithLoader
                src="/images/home/hero-desktop.jpg"
                alt="Professional headshot of Tim, a Frontend Developer based in San Francisco Bay Area"
                fill
                className="object-cover object-top-left bg-[#E5E7EB] dark:bg-[#1F2937]"
                priority
              />
            </div>

            {/* Mobile Image */}
            <div className="block lg:hidden relative w-full">
              <ImageWithLoader
                src="/images/home/hero-mobile.jpg"
                alt="Professional headshot of Tim, a Frontend Developer based in San Francisco Bay Area"
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
