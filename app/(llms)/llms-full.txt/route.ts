import dayjs from "dayjs";

import { SITE_INFO, SOCIAL_LINKS, TECH_STACK, USER } from "@/lib/config";
import { getBlogPosts } from "@/features/blog/lib/blog.server";
import { getLLMText } from "@/features/blog/lib/get-llm-text";
import { getExperienceItems } from "@/features/experience/data/get-experience-items";
import { getProjects } from "@/features/projects/data/projectSource";


const allPosts = getBlogPosts();
const EXPERIENCES = getExperienceItems();
const PROJECTS = getProjects();

const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.label}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.join(", ") || "N/A";
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod}\n\nSkills: ${skills}\n\n${position.description?.trim()}`;
    })
    .join("\n\n"),
).join("\n\n")}
`;

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = item.techStacks?.length
    ? `\n\nSkills: ${item.techStacks.join(", ")}`
    : "";
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  const link =
    item.websiteUrl || item.githubUrl
      ? `\n\nProject URL: ${item.websiteUrl || item.githubUrl}`
      : "";
  return `### ${item.title}${link}${skills}${description}`;
}).join("\n\n")}
`;

async function getBlogContent() {
  const text = await Promise.all(
    allPosts.map(
      async (item) =>
        `---\ntitle: "${item.title}"\ndescription: "${item.description}"\nlast_updated: "${dayjs(item.lastUpdated || item.created).format("MMMM D, YYYY")}"\nsource: "${SITE_INFO.url}/blog.mdx/${item.slug}"\n---\n\n${await getLLMText(item)}`,
    ),
  );
  return text.join("\n\n");
}

async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, achievements, certifications, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as a Frontend Developer.</SYSTEM>

# hiretimsf.com

> A minimal portfolio, and blog to showcase my work as a Frontend Developer.

${aboutText}
${experienceText}
${projectsText}

## Blog

${await getBlogContent()}`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
