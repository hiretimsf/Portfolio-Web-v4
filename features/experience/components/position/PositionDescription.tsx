import { ArrowUpRight } from "lucide-react";
import type React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type PositionDescriptionProps = {
  description?: string;
  hasSkills?: boolean;
};

export default function PositionDescription({
  description,
  hasSkills = false,
}: PositionDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <Prose className={cn(
      "border-x border-black/10 dark:border-white/10 border-dashed px-4 py-4",
      !hasSkills && "border-b"
    )}>
      <ReactMarkdown
        components={{
          a: ({ node: _node, ...props }) => {
            const { href, children, className, ...rest } = props;
            const isExternalHref =
              typeof href === "string" && /^https?:\/\//.test(href);

            const content = (
              <>
                {children}
                {isExternalHref && (
                  <ArrowUpRight
                    className="text-foreground/70 group-hover:text-panda-orange size-3"
                    aria-hidden="true"
                  />
                )}
              </>
            );

            if (typeof href === "string" && href.length > 0) {
              return (
                <a
                  {...rest}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    className,
                    "group text-foreground/80 inline-flex items-center gap-1 hover:underline hover:underline-offset-4",
                  )}
                >
                  {content}
                </a>
              );
            }

            return (
              <span
                {...rest}
                className={cn(className, "inline-flex items-center gap-1")}
              >
                {content}
              </span>
            );
          },
        }}
      >
        {description}
      </ReactMarkdown>
    </Prose>
  );
}

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-md text-foreground prose-invert max-w-none",
        "prose-a:font-medium prose-a:wrap-break-word prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
        "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
      {...props}
    />
  );
}
