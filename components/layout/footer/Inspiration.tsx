import Link from "next/link";


const defaultClass =
  "text-foreground hover:text-muted-foreground underline underline-offset-4 transition-colors";

export default function Inspiration() {
  return (
    <div className="relative screen-line-before max-w-5xl w-full mx-auto border-x border-edge py-4">

      <p className="text-muted-foreground hidden text-center text-sm leading-5 sm:block max-w-xl mx-auto">
        Inspired by{" "}
        <Link
          href="https://dub.co"
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          Dub.co
        </Link>{" "}
        and{" "}
        <Link
          href="https://chanhdai.com"
          target="_blank"
          rel="noopener noreferrer"
          className={defaultClass}
        >
          Chanhdai.com
        </Link>
      </p>
    </div>
  );
}
