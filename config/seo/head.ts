import { truncateDescription, truncateTitle } from "@/lib/seo";
import type { HeadType } from "@/types";

const HEAD: HeadType[] = [
  {
    page: "Home",
    title: truncateTitle(
      "Tim | Design Engineer & Frontend Developer | 5+ Years Exp",
    ),
    description: truncateDescription(
      "Design Engineer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps.",
    ),
    slug: "/",
  },
  {
    page: "About",
    title: truncateTitle("About Tim | Design Engineer & Pixel-Perfect Developer"),
    description: truncateDescription(
      "Passionate Design Engineer exploring new technologies to turn ideas into reality through polished, thoughtfully crafted personal projects.",
    ),
    slug: "/about",
  },
  {
    page: "Blog",
    title: truncateTitle("Blog | Frontend Development Insights | Tim"),
    description: truncateDescription(
      "Thoughts on exploring new technologies and turning ideas into reality through code.",
    ),
    slug: "/blog",
  },
  {
    page: "Projects",
    title: truncateTitle("Projects | High-Quality Web & Mobile Apps | Tim"),
    description: truncateDescription(
      "Showcasing pixel-perfect applications built with Next.js, React, TypeScript and modern front-end technologies.",
    ),
    slug: "/projects",
  },
  {
    page: "Contact",
    title: truncateTitle("Contact Tim | Hire a Design Engineer"),
    description: truncateDescription(
      "Ready to build high-quality, user-centric applications? Get in touch with Tim for pixel-perfect execution.",
    ),
    slug: "/contact",
  },
];

export default HEAD;
