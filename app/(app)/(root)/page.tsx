import SeparatorHorizontal from "@/components/SeparatorHorizontal";
import Hero from "@/features/home/components/Hero";
import HeadingTitle from "@/components/HeadingTitle";
import ContactMe from "@/components/ContactMe";
import FeaturedApps from "@/features/home/components/FeaturedApps";
import { WhatPeopleSay } from "@/features/home/components/WhatPeopleSay";
import { FaqSection } from "@/features/home/components/FAQ";
import LatestBlogPosts from "@/features/home/components/LatestBlogPosts";

export default function Home() {
  return (
    <>
      <SeparatorHorizontal borderTop={false} />
      <Hero
        imageSrcDesktop="/images/vertical-profile.jpg"
        imageSrcMobile="/images/horizontal-profile.jpg"
        imageAlt="Professional headshot of Tim, a Frontend Developer based in San Francisco Bay Area"
      />
      <SeparatorHorizontal short={true} />
      <HeadingTitle title="Featured Apps" />
      <SeparatorHorizontal short={true} />
      <FeaturedApps />
      <SeparatorHorizontal short={true} />
      <SeparatorHorizontal short={true} />
      <HeadingTitle title="Latest Blog Posts" />
      <SeparatorHorizontal short={true} />
      <LatestBlogPosts />
      <SeparatorHorizontal short={true} />
      <HeadingTitle title="What People Are Saying" />
      <SeparatorHorizontal short={true} />
      <WhatPeopleSay />
      <SeparatorHorizontal />
      <HeadingTitle title="FAQ" />
      <SeparatorHorizontal short={true} />
      <FaqSection />
      <SeparatorHorizontal short={true} />
      <ContactMe />
      <SeparatorHorizontal borderBottom={false} />
    </>
  );
}
