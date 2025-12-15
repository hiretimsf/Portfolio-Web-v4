import BackgroundDots from "@/features/common/components/BackgroundDots";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/features/home/data/faq";
import { cn } from "@/lib/utils";
import type { FaqType } from "@/features/home/types/FaqType";

type FaqSectionProps = {
  className?: string;
};

const FaqSection = ({ className = "" }: FaqSectionProps) => {
  return (
    <section
      className={cn(
        "relative mx-auto w-full justify-center px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      <Accordion
        type="single"
        collapsible
        className="bg-background mx-auto max-w-xl divide-y divide-dashed divide-border-edge border-x border-dashed border-border-edge"
      >
        {FAQ_ITEMS.map((item: FaqType, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: faq items are static
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-foreground px-4 text-lg/6 hover:no-underline sm:px-6 sm:text-xl/8 lg:px-8 text-left tracking-tight">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 px-4 pt-4 text-base/7 sm:px-6 sm:text-lg/8 lg:px-8 text-left border-t border-dashed border-border-edge tracking-tight">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <BackgroundDots
        gridId="faq"
        className="absolute z-[-1] text-gray-200/80"
      />
    </section>
  );
};

export { FaqSection };
