import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <Link
      href="/contact"
      className="group relative block rounded-xl border border-border-edge border-dashed bg-background p-4"
    >
      <div className="absolute bg-background right-2 top-2 z-10 rounded-full border border-border-edg border-dashed p-2.5 opacity-0 backdrop-blur-lg transition-opacity  group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right size-4 -rotate-45"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
      <div className="aspect-video relative w-full overflow-hidden rounded-lg border border-border-edge">
        <Image
          alt="Looking for a Frontend Developer?"
          fill
          className="blur-0 object-cover dark:grayscale"
          src="/images/twitter-image.jpg"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <p className="mt-4 font-display text-md font-semibold">Contact Me</p>
      <p className="mt-1 text-sm font-normal text-foreground/80 underline-offset-4 group-hover:underline">
        I&apos;m available for work.
      </p>
    </Link>
  );
}
