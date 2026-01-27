import Section from "@/components/layout/main/Section";
import ProjectCardItem from "@/components/common/ProjectCardItem";
import { GET_FEATURED_APPS } from "@/features/home/data/source";
import { slugify } from "@/lib/utils";

export default function FeaturedAppsSection() {
  const featuredApps = GET_FEATURED_APPS();

  return (
    <Section gridId="featured-apps">
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {featuredApps.map((featuredApp, index) => (
          <ProjectCardItem
            key={slugify(featuredApp.title ?? "")}
            item={featuredApp}
            index={index}
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
          />
        ))}
      </div>
    </Section>
  );
}
