import BackgroundDots from "@/components/BackgroundDots";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/features/home/data/faq";
import { cn } from "@/lib/utils";
import type { FaqItemType } from "@/features/home/types/FaqItem";

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
        className="bg-panda-background mx-auto max-w-xl divide-y divide-dashed divide-gray-200 border-x border-dashed border-gray-200"
      >
        {FAQ_ITEMS.map((item: FaqItemType, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: faq items are static
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-panda-text px-4 text-lg/6 font-semibold hover:no-underline sm:px-6 sm:text-xl/8 lg:px-8">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-panda-text px-4 text-base/7 sm:px-6 sm:text-lg/8 lg:px-8">
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
