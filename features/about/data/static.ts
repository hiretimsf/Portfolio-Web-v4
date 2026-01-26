import type { EmbedVideoType } from "../types/EmbedVideoType";
import type { PhotoType } from "../types/PhotoType";

export function GET_ANDROID_VIDEOS(): EmbedVideoType[] {
  return [
    {
      embedUrl: "https://www.youtube.com/embed/YjVJyqcv5I8?si=rLGU5MlcojDpsigP",
      embedAlt: "Portfolio App 2.0 (Kotlin)",
    },
    {
      embedUrl: "https://www.youtube.com/embed/j56fSGqF7Ho?si=KQSgguWxD5nPjAKv",
      embedAlt: "Portfolio App 1.0 (Java)",
    },
  ];
}

export function GET_EARLY_VIDEOS(): EmbedVideoType[] {
  return [
    {
      embedUrl: "https://www.youtube.com/embed/2TeqDGT7ATk?si=33imIN81oiRLyFkD",
      embedAlt: "Local Marketplace App",
    },
    {
      embedUrl: "https://www.youtube.com/embed/my5CPizUXEg?si=QeXsL35jgWzEz7zH",
      embedAlt: "Custom T shirt Design App",
    },
  ];
}

export function GET_FAMILY_PHOTOS(): PhotoType[] {
  return [
    {
      src: "/images/about/about_me_01.jpg",
      width: 750,
      height: 881,
      alt: "Tim's wedding photo showing a special moment with his wife",
    },
    {
      src: "/images/about/about_me_02.jpg",
      width: 750,
      height: 881,
      alt: "Tim with his family in a warm family moment",
    },
    {
      src: "/images/about/about_me_03.jpg",
      width: 750,
      height: 881,
      alt: "Tim running, showing his active lifestyle and fitness",
    },
  ];
}
