import { DE, MN, US } from "country-flag-icons/react/3x2";
import { DocsLayout } from "@/components/fuma/fuma-layout";
import { DocsBody, DocsPage } from "@/components/fuma/fuma-page";
import AndroidIcon from "@/icons/android-icon";
import DriverIcon from "@/icons/driver-icon";
import ForkliftIcon from "@/icons/forklift-icon";
import FrontendIcon from "@/icons/frontend-icon";
import GraduateIcon from "@/icons/graduate-icon";
import MarketingIcon from "@/icons/marketing-icon";
import ServerIcon from "@/icons/server-icon";
import WorkerIcon from "@/icons/worker-icon";
import { experienceSource, projectsSource } from "@/lib/source";
import type { ExperienceItemType, ProjectItemType } from "@/types";
import ExperienceItem from "./ExperienceItem";

interface WorkExperienceSectionProps {
  className?: string;
}

type ExperienceData = {
  companyName: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyLogoAlt?: string;
  companyLocation?: string;
  country?: string;
  isCurrentEmployer?: boolean;
  positions: Array<{
    id: string;
    title: string;
    employmentPeriod: string;
    employmentDuration?: string;
    employmentType?: string;
    description?: string;
    skills?: string[];
    icon?: string;
  }>;
  projectSlugs?: string[];
};

// Map icon names to icon components
const iconMap: Record<string, React.ComponentType | React.ReactNode> = {
  AndroidIcon,
  DriverIcon,
  ForkliftIcon,
  FrontendIcon,
  GraduateIcon,
  MarketingIcon,
  ServerIcon,
  WorkerIcon,
};

// Map country codes to country components
const countryMap: Record<string, React.ComponentType> = {
  US,
  DE,
  MN,
};

// Load projects from MDX files
const PROJECTS: (ProjectItemType & { slug: string })[] = projectsSource
  .getPages()
  .map(({ data, slugs }, index) => {
    const d = (data ?? {}) as {
      title?: string;
      description?: string;
      date?: string;
      imageUrl?: string;
      imageAlt?: string;
      github?: string;
      liveDemo?: string;
      category?: string;
    };

    const slug = Array.isArray(slugs) ? slugs[slugs.length - 1] : "";

    return {
      id: index,
      title: d.title ?? "",
      date: d.date,
      description: d.description ?? "",
      imageUrl: d.imageUrl ?? "/images/app-placeholder.jpg",
      imageAlt: d.imageAlt ?? d.title ?? "Project",
      github: d.github,
      liveDemo: d.liveDemo,
      category: d.category,
      slug,
    } satisfies ProjectItemType & { slug: string };
  });

// Helper function to parse date from employmentPeriod string
// Handles formats like "March 2007 — August 2007" or "October 2025 — Present"
function parseDateFromPeriod(period: string): Date | null {
  const parts = period.split(" — ");
  if (parts.length < 1) return null;

  const startDateStr = parts[0].trim();
  const date = new Date(startDateStr);

  // Check if date is valid
  if (Number.isNaN(date.getTime())) return null;

  return date;
}

// Helper function to get the most recent date from all positions in an experience
function getMostRecentDate(
  positions: Array<{ employmentPeriod: string }>,
): Date {
  const dates = positions
    .map((pos) => parseDateFromPeriod(pos.employmentPeriod))
    .filter((date): date is Date => date !== null);

  if (dates.length === 0) return new Date(0); // Return epoch if no valid dates

  // Sort descending and return the most recent
  dates.sort((a, b) => b.getTime() - a.getTime());
  return dates[0];
}

// Load experiences from MDX files
const EXPERIENCE: ExperienceItemType[] = experienceSource
  .getPages()
  .map(({ data, slugs }) => {
    const d = (data ?? {}) as ExperienceData;
    const slug = Array.isArray(slugs) ? slugs[slugs.length - 1] : "";

    // Map projects based on projectSlugs
    const projects = d.projectSlugs
      ? d.projectSlugs
          .map((projectSlug) => PROJECTS.find((p) => p.slug === projectSlug))
          .filter(
            (p): p is ProjectItemType & { slug: string } => p !== undefined,
          )
          .map(({ slug: _, ...project }) => project)
      : undefined;

    // Map country code to country component
    const country = d.country ? countryMap[d.country] : undefined;

    return {
      id: slug,
      companyName: d.companyName,
      companyWebsite: d.companyWebsite,
      companyLogo: d.companyLogo,
      companyLogoAlt: d.companyLogoAlt,
      companyLocation: d.companyLocation,
      country,
      isCurrentEmployer: d.isCurrentEmployer,
      positions: d.positions.map((position) => ({
        ...position,
        icon: position.icon
          ? (iconMap[position.icon] as React.ReactNode)
          : undefined,
      })),
      projects,
    } satisfies ExperienceItemType;
  })
  // Sort experiences by date (most recent first)
  .sort((a, b) => {
    const dateA = getMostRecentDate(a.positions);
    const dateB = getMostRecentDate(b.positions);

    // If dates are equal, keep current employer at top
    if (dateA.getTime() === dateB.getTime()) {
      if (a.isCurrentEmployer && !b.isCurrentEmployer) return -1;
      if (!a.isCurrentEmployer && b.isCurrentEmployer) return 1;
      return 0;
    }

    // Sort by date descending (most recent first)
    return dateB.getTime() - dateA.getTime();
  });

export default function WorkExperienceSection({
  className,
}: WorkExperienceSectionProps) {
  return (
    <section className={className} aria-label="Work Experience">
      <DocsLayout
        tree={experienceSource.pageTree}
        containerProps={{ className: "relative bg-transparent" }}
      >
        <DocsPage
          toc={EXPERIENCE.map((experience) => ({
            title: experience.companyName,
            url: `#${experience.id}`,
            depth: 2,
          }))}
          prose={false}
        >
          <DocsBody prose={false}>
            {EXPERIENCE && EXPERIENCE.length > 0 ? (
              EXPERIENCE.map((experience, index) => (
                <ExperienceItem
                  key={experience.id}
                  experience={experience}
                  className={
                    index % 2 === 0 ? undefined : "bg-muted/50 dark:bg-muted/20"
                  }
                />
              ))
            ) : (
              <p className="text-muted-foreground px-4 py-8 text-center text-sm">
                No work experience to display.
              </p>
            )}
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    </section>
  );
}
