import Title from "@/components/layout/main/Title";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import { getBaseUrl } from "@/lib/utils";
import type { HeadType } from "@/types";
import type { Metadata } from "next";
import { ContactForm } from "@/features/contact/ContactForm";
import Contact from "@/components/layout/main/Contact";


// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "Contact";

// Get SEO configuration for the current page from the HEAD array
const page = HEAD.find((page: HeadType) => page.page === PAGE) as HeadType;

// Configure comprehensive metadata for SEO and social sharing
// This includes all necessary meta tags for search engines and social media platforms
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: getBaseUrl(page.slug),
  },
  openGraph: {
    title: page.title,
    description: page.description,
    url: getBaseUrl(page.slug),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
};

export default async function ContactPage() {
  return (
    <>
      <Divider short={true}/>
      <main className="mx-auto flex flex-col">
        <Title
          title={"Contact"}
          textStyleClassName="text-3xl font-semibold md:text-4xl"
          gridId="grid-contact"
        />
        <Divider plain={true}/>
        <div className="border-border relative min-h-52 max-w-full">

          <ContactForm />
        </div>
      </main>
      <Divider short={true}/>
      <Contact showSocialLinks={true} />
      <Divider short={true} borderBottom={false}/>
    </>
  );
}
