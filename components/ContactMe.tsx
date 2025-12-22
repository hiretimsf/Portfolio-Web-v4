"use client";

import { Button } from "@/components/ui/button";
import SOCIAL_LINKS from "@/config/socialLinks";
import { trackEvent } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";

interface ContactMeProps {
  className?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  imageAlt?: string;
  showSocialLinks?: boolean;
}

const ContactMe = ({
  className = "",
  heading = "Looking for a Frontend Developer?",
  description = "I'm available for in-person or remote work.",
  buttonText = "Contact Me",
  imageAlt = "Professional frontend developer ready to collaborate on projects",
  showSocialLinks = false,
}: ContactMeProps) => {
  return (
    <section
      className={`relative mx-auto flex max-w-2xl flex-col px-6 pt-16 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:pt-0 ${className}`}
      aria-labelledby="contact-heading"
    >
      <div className="w-full flex-auto px-6 text-center sm:text-left">
        <h2
          id="contact-heading"
          className="text-white z-10 text-center text-4xl font-semibold tracking-tight text-pretty sm:text-left sm:text-5xl"
        >
          {heading}
        </h2>
        <p className="text-white/80 mt-6 text-center text-lg/8 text-pretty sm:text-left sm:text-lg">
          {description}
        </p>

        {showSocialLinks ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {SOCIAL_LINKS.map((link) => (
              <Button
                key={link.label}
                asChild
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  trackEvent({
                    name: "social_link_clicked",
                    properties: {
                      platform: link.label,
                      url: link.href,
                      source: "contact_section",
                    },
                  });
                }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              onClick={() => {
                trackEvent({
                  name: "cta_contact_me_clicked",
                  properties: {
                    source: "home_page_cta",
                  },
                });
              }}
            >
              <Link href="/contact">{buttonText}</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="flex-none">
        <Image
          alt={imageAlt}
          src="/images/contact-me.png"
          width={400}
          height={400}
          className="z-10 h-96 w-full rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>
      <Image
        src="/images/background.jpg"
        alt=""
        fill
        className="absolute inset-0 -z-10 object-cover"
      />
    </section>
  );
};

export default ContactMe;
