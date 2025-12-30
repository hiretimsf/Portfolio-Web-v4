"use client";

import CardItem from "@/features/common/components/CardItem";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";

export default function Projects({ data }: { data: ProjectType[] }) {
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
  }, [data]);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full space-y-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {sortedData.map((item, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2">
              <div className="h-full p-1">
                <CardItem
                  item={item}
                  index={index}
                  type="project"
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                api?.scrollPrev();
              }}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <div className="flex items-center gap-2 px-4">
              {Array.from({ length: count }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="h-2 rounded-full bg-primary"
                  initial={false}
                  animate={{
                    width: current === index + 1 ? 24 : 8,
                    opacity: current === index + 1 ? 1 : 0.3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                api?.scrollNext();
              }}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
