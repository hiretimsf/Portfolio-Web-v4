import type { FaqType } from "@/features/home/types/FaqType";
import type { SkillType } from "@/features/home/types/SkillType";
import { projects } from "@/.source/server";
import type { Source, SourceConfig } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { formatDate } from "@/lib/utils";
import type { ProjectType } from "@/features/projects/types/ProjectType";

// --- FAQ ---
export function GET_FAQ(): FaqType[] {
  return [
  {
    id: "faq-1",
    question: "Why should you hire me?",
    answer:
      "Because I love what I do. I enjoy building apps and running. They are my biggest passions, and I put real energy and care into both.",
  },
  {
    id: "faq-2",
    question: "How much experience do you have?",
    answer:
      "I have about five years of frontend development experience working with React, Next.js, TailwindCSS, JavaScript, and TypeScript.",
  },
  {
    id: "faq-3",
    question: "Are you authorized to work in the U.S.?",
    answer: "Yes, I am fully authorized to work in the United States.",
  },
  {
    id: "faq-4",
    question: "Do you prefer remote or on-site work?",
    answer:
      "I am mainly looking for on-site opportunities in the San Francisco Bay Area. I love the city, the people, and the weather.",
  },
  {
    id: "faq-5",
    question: "What is your educational background?",
    answer:
      "I have a Bachelor's degree in Computer Science from the University of Applied Sciences of Mittweida in Germany.",
  },
  {
    id: "faq-6",
    question: "What languages do you speak?",
    answer:
      "I speak English, German, and Mongolian fluently, and a little Russian.",
  },
  {
    id: "faq-7",
    question: "What projects are you most passionate about?",
    answer:
      "I enjoy building projects that make a positive impact. One example is a full stack blog app I built that has received over 450 stars from developers.",
  },
  {
    id: "faq-8",
    question: "What are your hobbies?",
    answer: "I enjoy running outdoors and spending time with my family.",
  },
  {
    id: "faq-9",
    question: "What is next for you in 2026 and beyond?",
    answer:
      "I want to build more web apps with AI integration and keep pushing my skills forward.",
  },
  {
    id: "faq-10",
    question: "What is a fun fact about you?",
    answer: "I used to ride a horse to school when I was a kid.",
  },
  ];
}

// --- Skills ---
export const SKILLS: SkillType[] = [
  { name: "Authorized", description: "to work in the United States" },
  { name: "Based", description: "in the San Francisco Bay Area" },
  { name: "Love", description: "Next.js and TailwindCSS, Typescript" },
  { name: "Have", description: "a Computer Science degree" },
  { name: "Speak", description: "English, German, and Mongolian" },
];

// --- Testimonials ---
export function GET_TESTIMONIALS() {
  return [
  {
    authorAvatar: "https://unavatar.io/twitter/shadcn",
    authorName: "shadcn",
    authorBio: "@shadcn",
    url: "https://x.com/shadcn/status/1930094628885471387",
    quote: "Someone hire Tim.",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/shadcn",
    authorName: "shadcn",
    authorBio: "@shadcn",
    url: "https://x.com/shadcn/status/1930088043383533621",
    quote: "Oh woah :)",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/evilrabbit_",
    authorName: "Evil Rabbit",
    authorBio: "@evilrabbit_",
    url: "https://x.com/evilrabbit_/status/1930134433635676487",
    quote: "so good! 🔥😂",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/shadcn",
    authorName: "shadcn",
    authorBio: "@shadcn",
    url: "https://x.com/shadcn/status/2009307622059491448",
    quote: "Bookmarked 😃",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/marclou",
    authorName: "Marc Lou",
    authorBio: "@marclou",
    url: "https://x.com/marclou/status/2005538930192683430",
    quote: "Where are u based I need you 😭",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/hiretimsf",
    authorName: "HireTimSF.com",
    authorBio: "@hiretimsf",
    url: "https://x.com/hiretimsf/status/1799500139662651526",
    quote: "Thank you @vercel",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/alfonsusac",
    authorName: "Alfon",
    authorBio: "@alfonsusac",
    url: "https://x.com/alfonsusac/status/1916331166984245599",
    quote: "someone should hire tim fr",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/danielcranney",
    authorName: "Daniel Cranney 🇬🇧",
    authorBio: "@danielcranney",
    url: "https://x.com/danielcranney/status/1949919177437003788",
    quote:
      "Tim is out here running marathons with his domain name on his chest, can somebody HIRE TIM PLEASE",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/EonWeaveLabs",
    authorName: "Eon Weave Labs",
    authorBio: "@EonWeaveLabs",
    url: "https://x.com/EonWeaveLabs/status/1930622440578732190",
    quote:
      "The fact that you made this your cover photo shows you understand personal branding better than most agencies. Whoever hires Tim is getting someone who thinks strategically!",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/hiretimsf",
    authorName: "HireTimSF.com",
    authorBio: "@hiretimsf",
    url: "https://x.com/hiretimsf/status/1900665736135405853",
    quote:
      "⚡️ Exciting News!\nMy portfolio was featured on @WeAreDevs! 🎉 A huge thank you to @danielcranney for including my work. I really appreciate it! 🙌🚀",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/preetsuthar17",
    authorName: "preet",
    authorBio: "@preetsuthar17",
    url: "https://x.com/preetsuthar17/status/1932667733964886198",
    quote: "Someone hire Tim!",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/danielcranney",
    authorName: "Daniel Cranney 🇬🇧",
    authorBio: "@danielcranney",
    url: "https://x.com/danielcranney/status/1937084213175456041",
    quote: "It's Monday so it's the perfect day to hire Tim",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/iamncdai",
    authorName: "Nc Dai",
    authorBio: "@iamncdai",
    url: "https://x.com/iamncdai/status/2009538019947389302",
    quote: "Wow, I’m really happy to see this!",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/dominikkoch",
    authorName: "Dominik Koch",
    authorBio: "@dominikkoch",
    url: "https://x.com/dominikkoch/status/2008328618653475296",
    quote: "this is so sick",
  },
  {
    authorAvatar: "https://unavatar.io/twitter/the_best_codes",
    authorName: "The Best Codes",
    authorBio: "@the_best_codes",
    url: "https://x.com/the_best_codes/status/2006158234952868134",
    quote: "Someone hire Tim",
  },
  {
    authorAvatar: "https://unavatar.io/youtube/CodingWithMitch",
    authorName: "CodingWithMitch",
    authorBio: "YouTube",
    url: "https://www.youtube.com/watch?v=OHo64fiWx2k",
    quote: "Codingwithmitch App Reviews #1",
  },
  {
    authorAvatar: "https://unavatar.io/youtube/DThompsonDev",
    authorName: "DThompsonDev",
    authorBio: "YouTube",
    url: "https://www.youtube.com/watch?v=wfL5arWfeOw",
    quote: "You are doing portfolio sites wrong. Let's Fix it!",
  },
  ];
}

// --- Featured Apps ---
// We use the projects source but filter for featured items
const projectsDocs = projects as unknown as {
  toFumadocsSource: () => unknown;
};

export const featuredAppsSource = loader({
  baseUrl: "/projects",
  source: projectsDocs.toFumadocsSource() as Source<SourceConfig>,
});

export function GET_FEATURED_APPS(): ProjectType[] {
  return featuredAppsSource
    .getPages()
    .map((page, index) => {
      const data = page.data as unknown as ProjectType;
      return {
        id: index, // or use page.url as id if needed unique string
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        featured: data.featured,
        showOnPortfolio: data.showOnPortfolio,
        websiteUrl: data.websiteUrl,
        githubUrl: data.githubUrl,
        videoEmbedUrl: data.videoEmbedUrl,
        videoEmbedAlt: data.videoEmbedAlt,
        techStacks: data.techStacks,
        fromDate: data.fromDate ? formatDate(data.fromDate, "MM/yyyy") : "",
        toDate: data.toDate ? formatDate(data.toDate, "MM/yyyy") : "",
        weight: data.weight,
        comingSoon: data.comingSoon,
      };
    })
    .filter((project) => project.featured === true)
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
}
