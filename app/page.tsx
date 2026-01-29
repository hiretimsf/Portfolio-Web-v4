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
      <Divider short={true} />
      <HeroSection />
      <Divider plain={true} />
      <Title title="Featured Apps" />
      <Divider plain={true} />
      <FeaturedAppsSection />
      <Divider plain={true}/>
      <Title title="Latest Blog Posts" />
      <Divider plain={true}/>
      <LatestBlogPostsSection />
      <Divider plain={true}/>
      <Title title="What People Are Saying" />
      <Divider plain={true}/>
      <TestimonialsSection />
      <Divider plain={true}/>
      <Title title="FAQ" />
      <Divider plain={true}/>
      <FaqSection />
      <Divider short={true}/>
      <Contact />
      <Divider short={true} borderBottom={false}/>
    </>
  );
}
