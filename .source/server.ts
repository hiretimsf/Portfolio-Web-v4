// @ts-nocheck
import * as __fd_glob_31 from "../features/about/content/web-apps/portfolio-website-v3.mdx?collection=about"
import * as __fd_glob_30 from "../features/about/content/web-apps/portfolio-website-v2.mdx?collection=about"
import * as __fd_glob_29 from "../features/about/content/web-apps/portfolio-website-v1.mdx?collection=about"
import * as __fd_glob_28 from "../features/about/content/web-apps/full-stack-blog-app.mdx?collection=about"
import * as __fd_glob_27 from "../features/about/content/about.mdx?collection=about"
import * as __fd_glob_26 from "../features/about/content/web-apps/portfolio-website-v3.mdx?collection=webApps"
import * as __fd_glob_25 from "../features/about/content/web-apps/portfolio-website-v2.mdx?collection=webApps"
import * as __fd_glob_24 from "../features/about/content/web-apps/portfolio-website-v1.mdx?collection=webApps"
import * as __fd_glob_23 from "../features/about/content/web-apps/full-stack-blog-app.mdx?collection=webApps"
import * as __fd_glob_22 from "../features/projects/content/tshirt-design-app.mdx?collection=projects"
import * as __fd_glob_21 from "../features/projects/content/stop-buy-domains.mdx?collection=projects"
import * as __fd_glob_20 from "../features/projects/content/renewable-energy-project.mdx?collection=projects"
import * as __fd_glob_19 from "../features/projects/content/project-marketing-materials.mdx?collection=projects"
import * as __fd_glob_18 from "../features/projects/content/product-landing-page.mdx?collection=projects"
import * as __fd_glob_17 from "../features/projects/content/portfolio-website-v3.mdx?collection=projects"
import * as __fd_glob_16 from "../features/projects/content/portfolio-website-v2.mdx?collection=projects"
import * as __fd_glob_15 from "../features/projects/content/portfolio-website-v1.mdx?collection=projects"
import * as __fd_glob_14 from "../features/projects/content/portfolio-website-v0.mdx?collection=projects"
import * as __fd_glob_13 from "../features/projects/content/portfolio-app-kotlin.mdx?collection=projects"
import * as __fd_glob_12 from "../features/projects/content/portfolio-app-java.mdx?collection=projects"
import * as __fd_glob_11 from "../features/projects/content/local-market-place-app.mdx?collection=projects"
import * as __fd_glob_10 from "../features/projects/content/full-stack-blog-app.mdx?collection=projects"
import * as __fd_glob_9 from "../features/privacy/content/privacy.mdx?collection=privacy"
import * as __fd_glob_8 from "../features/home/content/featured-apps/stop-buy-domains.mdx?collection=featuredApps"
import * as __fd_glob_7 from "../features/home/content/featured-apps/lazy-panda.mdx?collection=featuredApps"
import * as __fd_glob_6 from "../features/home/content/featured-apps/full-stack-blog-app.mdx?collection=featuredApps"
import * as __fd_glob_5 from "../features/experience/content/experience.mdx?collection=experience"
import * as __fd_glob_4 from "../features/education/content/education.mdx?collection=education"
import * as __fd_glob_3 from "../features/changelog/content/changelog.mdx?collection=changelog"
import * as __fd_glob_2 from "../features/blog/content/running-sf-marathon-and-promoting-myself.mdx?collection=blog"
import * as __fd_glob_1 from "../features/blog/content/my-open-source-contribution.mdx?collection=blog"
import * as __fd_glob_0 from "../features/blog/content/how-to-implement-next-mdx-remote-with-nextjs.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
} & {
  DocData: {
    about: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    blog: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    changelog: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    education: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    experience: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    featuredApps: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    privacy: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    projects: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    webApps: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const about = await create.docs("about", "features/about/content", {}, {"about.mdx": __fd_glob_27, "web-apps/full-stack-blog-app.mdx": __fd_glob_28, "web-apps/portfolio-website-v1.mdx": __fd_glob_29, "web-apps/portfolio-website-v2.mdx": __fd_glob_30, "web-apps/portfolio-website-v3.mdx": __fd_glob_31, });

export const blog = await create.docs("blog", "features/blog/content", {}, {"how-to-implement-next-mdx-remote-with-nextjs.mdx": __fd_glob_0, "my-open-source-contribution.mdx": __fd_glob_1, "running-sf-marathon-and-promoting-myself.mdx": __fd_glob_2, });

export const changelog = await create.docs("changelog", "features/changelog/content", {}, {"changelog.mdx": __fd_glob_3, });

export const education = await create.docs("education", "features/education/content", {}, {"education.mdx": __fd_glob_4, });

export const experience = await create.docs("experience", "features/experience/content", {}, {"experience.mdx": __fd_glob_5, });

export const featuredApps = await create.docs("featuredApps", "features/home/content/featured-apps", {}, {"full-stack-blog-app.mdx": __fd_glob_6, "lazy-panda.mdx": __fd_glob_7, "stop-buy-domains.mdx": __fd_glob_8, });

export const privacy = await create.docs("privacy", "features/privacy/content", {}, {"privacy.mdx": __fd_glob_9, });

export const projects = await create.docs("projects", "features/projects/content", {}, {"full-stack-blog-app.mdx": __fd_glob_10, "local-market-place-app.mdx": __fd_glob_11, "portfolio-app-java.mdx": __fd_glob_12, "portfolio-app-kotlin.mdx": __fd_glob_13, "portfolio-website-v0.mdx": __fd_glob_14, "portfolio-website-v1.mdx": __fd_glob_15, "portfolio-website-v2.mdx": __fd_glob_16, "portfolio-website-v3.mdx": __fd_glob_17, "product-landing-page.mdx": __fd_glob_18, "project-marketing-materials.mdx": __fd_glob_19, "renewable-energy-project.mdx": __fd_glob_20, "stop-buy-domains.mdx": __fd_glob_21, "tshirt-design-app.mdx": __fd_glob_22, });

export const webApps = await create.docs("webApps", "features/about/content/web-apps", {}, {"full-stack-blog-app.mdx": __fd_glob_23, "portfolio-website-v1.mdx": __fd_glob_24, "portfolio-website-v2.mdx": __fd_glob_25, "portfolio-website-v3.mdx": __fd_glob_26, });