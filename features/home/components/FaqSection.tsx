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
        className="bg-background mx-auto max-w-xl divide-y divide-dashed divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 shadow-sm rounded-xl corner-squircle"
      >
        {GET_FAQ().map((item: FaqType, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: faq items are static
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-foreground px-4 text-lg hover:no-underline sm:px-6 lg:px-8 text-left text-pretty">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/60 px-4 pt-4 font-mono text-md sm:px-6 lg:px-8 text-pretty leading-6 text-left border-t border-dashed border-black/10 dark:border-white/10">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export { FaqSection };
