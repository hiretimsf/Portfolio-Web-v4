import {
  defineCollections,
  defineDocs,
  defineConfig,
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import {
  baseProjectSchema,
  blogPostSchema,
  privacySchema,
  changelogSchema,
} from "@/config/schemas/base-schemas";

export const featuredApps = defineDocs({
  dir: "features/home/content/featured-apps",
  docs: defineCollections({
    type: "doc",
    dir: "features/home/content/featured-apps",
    schema: baseProjectSchema.extend({
      imageUrl: baseProjectSchema.shape.imageUrl.unwrap(),
      imageAlt: baseProjectSchema.shape.imageAlt.unwrap(),
    }),
  }),
});

export const about = defineDocs({
  dir: "features/about/content",
});

export const webApps = defineDocs({
  dir: "features/about/content/web-apps",
  docs: defineCollections({
    type: "doc",
    dir: "features/about/content/web-apps",
    schema: baseProjectSchema.extend({
      imageUrl: baseProjectSchema.shape.imageUrl.unwrap(),
      imageAlt: baseProjectSchema.shape.imageAlt.unwrap(),
    }),
  }),
});

export const projects = defineDocs({
  dir: "features/projects/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/projects/content",
    schema: baseProjectSchema,
  }),
});

export const experience = defineDocs({
  dir: "features/experience/content",
});

export const education = defineDocs({
  dir: "features/education/content",
});

export const blog = defineDocs({
  dir: "features/blog/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/blog/content",
    schema: blogPostSchema,
  }),
});

export const privacy = defineDocs({
  dir: "features/privacy/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/privacy/content",
    schema: privacySchema,
  }),
});

export const changelog = defineDocs({
  dir: "features/changelog/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/changelog/content",
    schema: changelogSchema,
  }),
});

export default defineConfig({
  plugins: [lastModified()],
});
