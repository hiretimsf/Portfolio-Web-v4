"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState } from "react";
import { FAMILY_PHOTOS } from "../data/family-photos";

export default function FamilyPhotos() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleImageClick = (index: number) => {
    setInitialSlide(index);
    setIsOpen(true);
  };

  return (
    <figure className="max-w-2xl mx-auto w-full mb-4 space-y-2">
      {/* Mobile Carousel View */}
      <div className="md:hidden w-full">
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {FAMILY_PHOTOS.map((photo, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative w-full overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    className="h-auto w-full rounded-xl object-cover dark:grayscale"
                    sizes="100vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-background/50 hover:bg-background/70 border-none" />
          <CarouselNext className="right-2 bg-background/50 hover:bg-background/70 border-none" />
        </Carousel>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {FAMILY_PHOTOS.map((photo, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden rounded-xl cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              className="h-auto w-full transition-transform hover:scale-105 rounded-xl object-cover dark:grayscale"
              sizes="33vw"
            />
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-5xl w-full p-0 overflow-hidden border-none bg-transparent shadow-none"
          showCloseButton={false}
        >
          <VisuallyHidden>
            <DialogTitle>Family Photos Gallery</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full">
            <Carousel
              opts={{
                startIndex: initialSlide,
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {FAMILY_PHOTOS.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-[80vh] flex items-center justify-center">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        className="object-contain dark:grayscale"
                        sizes="100vw"
                        priority={index === initialSlide}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-background/50 hover:bg-background/70 border-none text-foreground" />
              <CarouselNext className="right-4 bg-background/50 hover:bg-background/70 border-none text-foreground" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>

      <figcaption className="text-sm text-muted-foreground">
        This is my family and we love this city.
      </figcaption>
    </figure>
  );
}
