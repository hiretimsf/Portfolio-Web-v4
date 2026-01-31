import { IconType } from "react-icons";
import {
  SiAndroid,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiFirebase,
  SiJquery,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiEclipseide,
  SiKotlin,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TechStackIcon } from "@/components/common/Icons";

/**
 * Mapping of technology names to their corresponding icon components.
 * Normalizes technology names by converting to lowercase and removing spaces.
 */
const TECH_ICON_MAP: Record<string, IconType> = {
  android: SiAndroid,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  firebase: SiFirebase,
  jquery: SiJquery,
  adobephotoshop: SiAdobephotoshop,
  photoshop: SiAdobephotoshop,
  adobeillustrator: SiAdobeillustrator,
  illustrator: SiAdobeillustrator,
  eclipseide: SiEclipseide,
  eclipse: SiEclipseide,
  kotlin: SiKotlin,
  java: FaJava,
};

/**
 * Normalizes a technology name for icon lookup.
 * Converts to lowercase and removes all whitespace.
 */
const normalizeTechName = (tech: string): string => {
  return tech.toLowerCase().replace(/\s+/g, "");
};

/**
 * Returns the appropriate icon component for a given technology.
 * Falls back to a generic TechStackIcon if no specific icon is found.
 *
 * @param tech - The technology name (e.g., "React", "Next.js", "TypeScript")
 * @returns The corresponding IconType component
 */
export const getTechIcon = (tech: string): IconType => {
  const normalizedTech = normalizeTechName(tech);
  return TECH_ICON_MAP[normalizedTech] ?? (TechStackIcon as unknown as IconType);
};

/**
 * Checks if a specific icon exists for the given technology.
 *
 * @param tech - The technology name
 * @returns true if a specific icon exists, false otherwise
 */
export const hasTechIcon = (tech: string): boolean => {
  const normalizedTech = normalizeTechName(tech);
  return normalizedTech in TECH_ICON_MAP;
};

/**
 * Returns a list of all supported technology names.
 */
export const getSupportedTechnologies = (): string[] => {
  return Object.keys(TECH_ICON_MAP);
};
