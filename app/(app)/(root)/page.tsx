import SeparatorHorizontal from "@/components/SeparatorHorizontal";
import Hero from "@/features/home/Hero";
import HeadingTitle from "@/components/HeadingTitle";
import ContactMe from "@/features/home/ContactMe";
import FeaturedApps from "@/features/home/FeaturedApps";
import Testimonials from "@/features/home/Testimonials";
import { FaqSection } from "@/features/home/FAQ";

export default function Home() {
  return (
    <>
      <SeparatorHorizontal borderTop={false} />
      <Hero
        imageSrcDesktop="/images/vertical-profile.jpg"
        imageSrcMobile="/images/horizontal-profile.jpg"
        imageAlt="Professional headshTot of Tim, a Design Engineer and Frontend Developer based in San Francisco Bay Area"
      />
      <SeparatorHorizontal short={true} />
      <HeadingTitle
        title="FEATURED APPS"
        textStyleClassName="text-2xl font-bold sm:text-3xl"
      />
      <SeparatorHorizontal short={true} />
      <FeaturedApps />
      <SeparatorHorizontal short={true} />
      <HeadingTitle
        title="WHAT PEOPLE ARE SAYING"
        textStyleClassName="text-2xl font-bold sm:text-3xl"
      />
      <SeparatorHorizontal short={true} />
      <Testimonials />
      <SeparatorHorizontal />
      <HeadingTitle
        title="FAQ"
        textStyleClassName="text-2xl font-bold sm:text-3xl"
      />
      <SeparatorHorizontal short={true} />
      <FaqSection />
      <SeparatorHorizontal short={true} />
      <ContactMe />
      <SeparatorHorizontal borderBottom={false} />
    </>
  );
}
