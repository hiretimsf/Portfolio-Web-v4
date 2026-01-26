import { blog } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import type { Source, SourceConfig } from "fumadocs-core/source";

const blogDocs = blog as unknown as {
  toFumadocsSource: () => unknown;
};

export const blogSource = loader({
  baseUrl: "/blog",
  source: blogDocs.toFumadocsSource() as Source<SourceConfig>,
});
