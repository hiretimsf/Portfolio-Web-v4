import Link from "next/link";
import { SOURCE_CODE_GITHUB_URL } from "@/config/seo/site";

const defaultClass =
  "text-foreground hover:text-muted-foreground underline underline-offset-4 transition-colors";

const techLinks: { label: string; href: string }[] = [
  { label: "v0", href: "https://v0.dev/" },
  { label: "Cursor", href: "https://www.cursor.com/" },
  { label: "Next.js", href: "https://nextjs.org/" },
  { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { label: "Vercel", href: "https://vercel.com/" },
  { label: "Geist", href: "https://vercel.com/font" },
  {
    label: "GitHub",
    href: SOURCE_CODE_GITHUB_URL,
  },
];

export default function TechStacks() {
  return (
    <div className="screen-line-before max-w-5xl w-full mx-auto border-x border-edge py-4">
      <p className="text-muted-foreground hidden text-center text-sm leading-5 sm:block max-w-xl mx-auto">
        Loosely designed in{" "}
        <Link
          href={techLinks[0]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[0]?.label}
        </Link>{" "}
        and coded in{" "}
        <Link
          href={techLinks[1]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[1]?.label}
        </Link>{" "}
        . Built with{" "}
        <Link
          href={techLinks[2]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[2]?.label}
        </Link>{" "}
        and{" "}
        <Link
          href={techLinks[3]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[3]?.label}
        </Link>{" "}
        , deployed on{" "}
        <Link
          href={techLinks[4]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[4]?.label}
        </Link>
        . All text is set in the{" "}
        <Link
          href={techLinks[5]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[5]?.label}
        </Link>{" "}
        typeface.
      </p>
      <p className="text-muted-foreground text-center text-sm leading-5">
        Code is available on{" "}
        <Link
          href={techLinks[6]?.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          {techLinks[6]?.label}
        </Link>
        .
      </p>
    </div>
  );
}
