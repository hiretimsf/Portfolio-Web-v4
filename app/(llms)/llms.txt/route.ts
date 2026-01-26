import { SITE_INFO } from "@/lib/config";
import { getBlogPosts } from "@/features/blog/lib/blog.server";

const allPosts = getBlogPosts();

const content = `# hiretimsf.com

> A minimal portfolio, and blog to showcase my work as a Frontend Developer.

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.

## Blog

${allPosts.map((item) => `- [${item.title}](${SITE_INFO.url}/blog.mdx/${item.slug}): ${item.description}`).join("\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
