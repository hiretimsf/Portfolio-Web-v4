// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
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
}>();
const browserCollections = {
  about: create.doc("about", {"about.mdx": () => import("../features/about/content/about.mdx?collection=about"), "web-apps/full-stack-blog-app.mdx": () => import("../features/about/content/web-apps/full-stack-blog-app.mdx?collection=about"), "web-apps/portfolio-website-v1.mdx": () => import("../features/about/content/web-apps/portfolio-website-v1.mdx?collection=about"), "web-apps/portfolio-website-v2.mdx": () => import("../features/about/content/web-apps/portfolio-website-v2.mdx?collection=about"), "web-apps/portfolio-website-v3.mdx": () => import("../features/about/content/web-apps/portfolio-website-v3.mdx?collection=about"), }),
  blog: create.doc("blog", {"how-to-implement-next-mdx-remote-with-nextjs.mdx": () => import("../features/blog/content/how-to-implement-next-mdx-remote-with-nextjs.mdx?collection=blog"), "my-open-source-contribution.mdx": () => import("../features/blog/content/my-open-source-contribution.mdx?collection=blog"), "running-sf-marathon-and-promoting-myself.mdx": () => import("../features/blog/content/running-sf-marathon-and-promoting-myself.mdx?collection=blog"), }),
  changelog: create.doc("changelog", {"changelog.mdx": () => import("../features/changelog/content/changelog.mdx?collection=changelog"), }),
  education: create.doc("education", {"education.mdx": () => import("../features/education/content/education.mdx?collection=education"), }),
  experience: create.doc("experience", {"experience.mdx": () => import("../features/experience/content/experience.mdx?collection=experience"), }),
  featuredApps: create.doc("featuredApps", {"full-stack-blog-app.mdx": () => import("../features/home/content/featured-apps/full-stack-blog-app.mdx?collection=featuredApps"), "lazy-panda.mdx": () => import("../features/home/content/featured-apps/lazy-panda.mdx?collection=featuredApps"), "stop-buy-domains.mdx": () => import("../features/home/content/featured-apps/stop-buy-domains.mdx?collection=featuredApps"), }),
  privacy: create.doc("privacy", {"privacy.mdx": () => import("../features/privacy/content/privacy.mdx?collection=privacy"), }),
  projects: create.doc("projects", {"full-stack-blog-app.mdx": () => import("../features/projects/content/full-stack-blog-app.mdx?collection=projects"), "local-market-place-app.mdx": () => import("../features/projects/content/local-market-place-app.mdx?collection=projects"), "portfolio-app-java.mdx": () => import("../features/projects/content/portfolio-app-java.mdx?collection=projects"), "portfolio-app-kotlin.mdx": () => import("../features/projects/content/portfolio-app-kotlin.mdx?collection=projects"), "portfolio-website-v0.mdx": () => import("../features/projects/content/portfolio-website-v0.mdx?collection=projects"), "portfolio-website-v1.mdx": () => import("../features/projects/content/portfolio-website-v1.mdx?collection=projects"), "portfolio-website-v2.mdx": () => import("../features/projects/content/portfolio-website-v2.mdx?collection=projects"), "portfolio-website-v3.mdx": () => import("../features/projects/content/portfolio-website-v3.mdx?collection=projects"), "product-landing-page.mdx": () => import("../features/projects/content/product-landing-page.mdx?collection=projects"), "project-marketing-materials.mdx": () => import("../features/projects/content/project-marketing-materials.mdx?collection=projects"), "renewable-energy-project.mdx": () => import("../features/projects/content/renewable-energy-project.mdx?collection=projects"), "stop-buy-domains.mdx": () => import("../features/projects/content/stop-buy-domains.mdx?collection=projects"), "tshirt-design-app.mdx": () => import("../features/projects/content/tshirt-design-app.mdx?collection=projects"), }),
  webApps: create.doc("webApps", {"full-stack-blog-app.mdx": () => import("../features/about/content/web-apps/full-stack-blog-app.mdx?collection=webApps"), "portfolio-website-v1.mdx": () => import("../features/about/content/web-apps/portfolio-website-v1.mdx?collection=webApps"), "portfolio-website-v2.mdx": () => import("../features/about/content/web-apps/portfolio-website-v2.mdx?collection=webApps"), "portfolio-website-v3.mdx": () => import("../features/about/content/web-apps/portfolio-website-v3.mdx?collection=webApps"), }),
};
export default browserCollections;