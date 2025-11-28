import { truncateDescription } from "@/lib/seo";
import { NavigationLinkType } from "@/types";
import {
  UserIcon as AboutMeIcon,
  RssIcon as BlogIcon,
  UserPenIcon as ContactIcon,
  HomeIcon,
  ArchiveIcon as ProjectsIcon,
  FileTextIcon as ResumeIcon
} from "lucide-react";

const navigationLinks: NavigationLinkType[] = [
  {
    icon: HomeIcon,
    href: "/",
    label: "Home",
  },
  {
    icon: AboutMeIcon,
    href: "/about",
    label: "About",
    subNavigationLinks: [
      {
        href: "/about",
        label: "About Me",
        description: truncateDescription("Background and skills", 30),
        icon: AboutMeIcon,
      },
      {
        href: "/resume",
        label: "Resume",
        description: truncateDescription("Experience and education", 30),
        icon: ResumeIcon,
      },
      {
        href: "/contact",
        label: "Contact",
        description: truncateDescription("Contact me", 30),
        icon: ContactIcon,
      },
    ],
  },
 {
    icon: ProjectsIcon,
    href: "/projects",
    label: "Projects",
  },
  {
    icon: BlogIcon,
    href: "/blog",
    label: "Blog",
  },
];

export default navigationLinks;
