"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicator,
  CarouselCounter,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
  }[];
  caption?: string;
  className?: string;
}

export function ImageSlider({ images, caption, className }: ImageSliderProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("my-6 w-full", className)}>
      <Carousel className="w-full group">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Overlapping Buttons */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-900/50 dark:border-zinc-800" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-900/50 dark:border-zinc-800" />
            <div className="absolute bottom-4 left-0 right-0 z-10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
              <CarouselIndicator
                totalSlides={images.length}
                className="mt-0!"
              />
              <CarouselCounter className="absolute right-4 bottom-0" />
            </div>
          </>
        )}
      </Carousel>
      {caption && (
        <p className="mt-4 text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
          {caption}
        </p>
      )}
    </div>
  );
}
