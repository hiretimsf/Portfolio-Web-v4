import BackgroundDots from "@/features/common/components/BackgroundDots";
import MasonryGrid from "@/features/home/components/MasonryGrid";
import ShoutoutItem from "@/features/home/components/TestimonialsItem";
import { TESTIMONIALS } from "@/features/home/data/testimonials";
import type { TestimonialType } from "@/features/home/types/TestimonialType";

export default function Testimonials() {
  return (
    <MasonryGrid className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {TESTIMONIALS.map((item: TestimonialType, index: number) => (
        <ShoutoutItem key={`${item.type}-${index}`} item={item} index={index} />
      ))}
      <BackgroundDots gridId="testimonials" className="text-gray-200/80" />
    </MasonryGrid>
  );
}
