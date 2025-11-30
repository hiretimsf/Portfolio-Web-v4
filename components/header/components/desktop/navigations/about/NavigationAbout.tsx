import NAVIGATION_LINKS from "@/config/navigationLinks";
import SOCIAL_LINKS from "@/config/socialLinks";
import { CircleUserIcon } from "lucide-react";
import CardItem from "./CardItem";
import SocialLink from "./SocialLink";

const NavigationAbout = () => {
  const aboutSection = NAVIGATION_LINKS.find((item) => item.label === "About");
  const aboutLinks = aboutSection?.subNavigationLinks || [];

  return (
    <div className="grid w-[540px] grid-cols-[60%_40%] divide-x divide-dashed">
      <div className="flex flex-col gap-4 p-4">
        {aboutLinks.map((item) => (
          <CardItem
            key={item.href}
            href={item.href}
            title={item.label}
            description={item.description || ""}
            icon={item.icon || CircleUserIcon}
            external={
              item.href.startsWith("http") || item.href.endsWith(".pdf")
            }
          />
        ))}
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-1">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationAbout;
