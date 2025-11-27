import {
  defineCollections,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const pages = defineDocs({
  dir: "content/docs",
});
