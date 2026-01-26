import Divider from "@/components/Divider";
import HeroSection from "@/features/home/components/HeroSection";
import Title from "@/components/layout/main/Title";
import Contact from "@/components/layout/main/Contact";
import FeaturedAppsSection from "@/features/home/components/FeaturedAppsSection";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { FaqSection } from "@/features/home/components/FaqSection";
import LatestBlogPostsSection from "@/features/home/components/LatestBlogPostsSection";

export default function Home() {
  return (
    <>
      <Divider borderTop={false} />
      <HeroSection />
      <Divider short={true} />
      <Title title="Featured Apps" />
      <Divider short={true} />
      <FeaturedAppsSection />
      <Divider short={true} />
      <Title title="Latest Blog Posts" />
      <Divider short={true} />
      <LatestBlogPostsSection />
      <Divider short={true} />
      <Title title="What People Are Saying" />
      <Divider short={true} />
      <TestimonialsSection />
      <Divider />
      <Title title="FAQ" />
      <Divider short={true} />
      <FaqSection />
      <Divider short={true} />
      <Contact />
      <Divider borderBottom={false} />
    </>
  );
}
