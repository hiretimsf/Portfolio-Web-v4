import Section from "@/components/layout/main/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GET_FAQ } from "@/features/home/data/source";
import type { FaqType } from "@/features/home/types/FaqType";

const FaqSection = () => {
  return (
    <Section gridId="faq">
      <Accordion
        type="single"
        collapsible
        className="bg-background mx-auto max-w-xl divide-y divide-dashed divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 shadow-md"
      >
        {GET_FAQ().map((item: FaqType, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: faq items are static
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-foreground px-4 text-lg/6 hover:no-underline sm:px-6 sm:text-xl/8 lg:px-8 text-left tracking-tight">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 px-4 pt-4 text-base/7 sm:px-6 sm:text-lg/8 lg:px-8 text-left border-t border-dashed border-black/10 dark:border-white/10 tracking-tight">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export { FaqSection };
