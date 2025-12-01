import BackgroundDots from "@/components/BackgroundDots";
import MasonryGrid from "@/features/home/components/MasonryGrid";
import ShoutoutItem from "@/features/home/components/ShoutOutItem";
import type { ShoutoutItemType } from "@/features/home/types/ShoutOutItem";

type TestimonialsProps = {
  shoutouts: ShoutoutItemType[];
};

export default function Testimonials({ shoutouts }: TestimonialsProps) {
  return (
    <MasonryGrid className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {shoutouts.map((item: ShoutoutItemType, index: number) => (
        <ShoutoutItem key={`${item.type}-${index}`} item={item} index={index} />
      ))}
      <BackgroundDots gridId="testimonials" className="text-gray-200/80" />
    </MasonryGrid>
  );
}
