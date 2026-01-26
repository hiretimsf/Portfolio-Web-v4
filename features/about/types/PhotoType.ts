import type { StaticImageData } from "next/image";

export type PhotoType = {
  src: StaticImageData | string;
  width?: number;
  height?: number;
  alt: string;
};
