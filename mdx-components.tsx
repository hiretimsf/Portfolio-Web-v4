import defaultMdxComponents from "@/components/mdx/mdxComponents";
import type { MDXComponents } from "mdx/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import type { ImageProps } from "next/image";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as ImageProps)} />,
    ...components,
  };
}
