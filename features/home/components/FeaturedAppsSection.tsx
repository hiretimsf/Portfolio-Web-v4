import BackgroundDots from "@/components/common/BackgroundDots";
import CardItem from "@/components/common/CardItem";
import { GET_FEATURED_APPS } from "@/features/home/data/source";
import { slugify } from "@/lib/utils";

export default function FeaturedAppsSection() {
  const featuredApps = GET_FEATURED_APPS();

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <BackgroundDots gridId="featured-apps" className="text-gray-200/80" />
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {featuredApps.map((featuredApp, index) => (
          <CardItem
            key={slugify(featuredApp.title ?? "")}
            item={featuredApp}
            index={index}
            type="project"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
          />
        ))}
      </div>
    </div>
  );
}
