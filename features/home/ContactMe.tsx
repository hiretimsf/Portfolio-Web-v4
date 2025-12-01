import Image from "next/image";
import BackgroundDots from "@/components/BackgroundDots";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContactMeProps {
  className?: string;
  email?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  imageAlt?: string;
}

const ContactMe = ({
  className = "",
  email = "hiretimsf@gmail.com",
  heading = "Looking for a Design Engineer?",
  description = "I'm available for in-person or remote work.",
  buttonText = "Contact Me",
  imageAlt = "Professional design engineer ready to collaborate on projects",
}: ContactMeProps) => {
  return (
    <section
      className={`relative mx-auto flex max-w-2xl flex-col px-6 pt-16 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:pt-0 ${className}`}
      aria-labelledby="contact-heading"
    >
      <div className="w-full flex-auto px-6 text-center sm:text-left">
        <h2
          id="contact-heading"
          className="text-panda-text z-10 text-center text-4xl font-semibold tracking-tight text-pretty sm:text-left sm:text-5xl"
        >
          {heading}
        </h2>
        <p className="text-panda-text mt-6 text-center text-lg/8 text-pretty sm:text-left sm:text-lg">
          {description}
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText}
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex-none">
        <Image
          alt={imageAlt}
          src="/images/contact-me.png"
          width={400}
          height={400}
          className="z-10 h-96 w-full rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm"
          priority={true}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>
      <BackgroundDots gridId="contact-me" className="text-gray-200/80" />
    </section>
  );
};

export default ContactMe;
