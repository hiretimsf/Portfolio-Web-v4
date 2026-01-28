"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronDown, LayoutList } from "lucide-react";

export function ProjectAccordion({ children }: { children: React.ReactNode }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="items" className="border-none">
        <div className="px-6 md:px-8">
          <div className="border-x border-black/10 dark:border-white/10 border-dashed px-4">
            <AccordionTrigger className="group justify-center md:justify-start text-muted-foreground py-4 hover:no-underline [&>svg]:hidden [&[data-state=open]_.custom-chevron]:rotate-180">
              <Button asChild>
                <div className="flex items-center gap-2">
                  <LayoutList className="h-4 w-4 text-muted-foreground" />
                  <span className="group-data-[state=open]:hidden">
                    View Projects
                  </span>
                  <span className="hidden group-data-[state=open]:block">
                    Hide Projects
                  </span>
                  <ChevronDown className="custom-chevron h-4 w-4 transition-transform duration-200" />
                </div>
              </Button>
            </AccordionTrigger>
          </div>
        </div>
        <AccordionContent className="p-0">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
