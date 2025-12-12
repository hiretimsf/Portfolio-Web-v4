import { changelog } from "@/.source/server";
import type { Source, SourceConfig } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";

const changelogDocs = changelog as unknown as {
  toFumadocsSource: () => unknown;
};

export const changelogSource = loader({
  baseUrl: "/changelog",
  source: changelogDocs.toFumadocsSource() as Source<SourceConfig>,
});
