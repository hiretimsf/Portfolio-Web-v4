import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function Heading<T extends Types = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? "h1";

  const sizes = {
    h1: "text-3xl",
    h2: "text-2xl",
    h3: "text-xl",
    h4: "text-lg",
    h5: "text-base",
    h6: "text-sm",
  };

  const size = sizes[As];

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn("flex flex-row items-center gap-2 scroll-m-28", className)}
      {...props}
    >
      <a
        data-card=""
        href={`#${props.id}`}
        className={cn(
          "text-foreground no-underline hover:underline hover:text-primary transition-colors duration-200 hover:underline-offset-4 font-semibold -mt-0.5!",
          size,
        )}
      >
        {props.children}
      </a>
    </As>
  );
}
