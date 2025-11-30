import { FaStrava as StravaIcon } from "react-icons/fa";
import {
  FaEnvelope as EmailIcon,
  FaFacebook as FacebookIcon,
  FaGithub as GitHubIcon,
  FaLinkedin as LinkedInIcon,
  FaXTwitter as XPlatformIcon,
} from "react-icons/fa6";
import type { SocialLinkType } from "@/types";

const SOCIAL_LINKS: SocialLinkType[] = [
  {
    href: "https://www.strava.com/athletes/128944314",
    icon: StravaIcon,
    label: "Strava",
  },
  {
    href: "mailto:hiretimsf@gmail.com",
    icon: EmailIcon,
    label: "Email",
  },
  {
    href: "https://x.com/hiretimsf",
    icon: XPlatformIcon,
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/hiretimsf",
    icon: GitHubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/hiretimsf/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/hiretimsf/",
    icon: FacebookIcon,
    label: "Facebook",
  },
];

export default SOCIAL_LINKS;
