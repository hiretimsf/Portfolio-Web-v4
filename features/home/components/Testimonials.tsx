import BackgroundDots from "@/components/BackgroundDots";
import { Effect } from "@/components/animate-ui/primitives/effects/effect";
import MasonryGrid from "@/features/home/components/MasonryGrid";
import ShoutoutItem from "@/features/home/components/ShoutOutItem";
import { shoutouts } from "@/features/home/data/shoutouts";
import type { ShoutoutItemType } from "@/features/home/types/ShoutOutItem";

export default function Testimonials() {
  return (
    <MasonryGrid className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {shoutouts.map((item: ShoutoutItemType, index: number) => (
        <Effect
          key={`${item.type}-${index}`}
          slide={{ direction: "up" }}
          fade
          inView
          inViewOnce
          inViewMargin="-50px"
        >
          <ShoutoutItem item={item} index={index} />
        </Effect>
      ))}
      <BackgroundDots gridId="testimonials" className="text-gray-200/80" />
    </MasonryGrid>
  );
}
