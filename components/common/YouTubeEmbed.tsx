"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type YouTubeEmbedProps = {
  embedUrl: string;
  alt: string;
  className?: string;
};

export default function YouTubeEmbed({
  embedUrl,
  alt,
  className,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from embed URL
  // Format: https://www.youtube.com/embed/VIDEO_ID?params
  const getVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const parts = pathname.split("/");
      return parts[parts.length - 1];
    } catch (e) {
      return null;
    }
  };

  const videoId = getVideoId(embedUrl);

  if (!videoId) {
    return null;
  }

  // Use hqdefault as it's consistently available. maxresdefault might be missing for some videos.
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isPlaying) {
    return (
      <iframe
        src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={`h-full w-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative cursor-pointer overflow-hidden bg-black ${className}`}
      onClick={() => setIsPlaying(true)}
      role="button"
      aria-label={`Play video: ${alt}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsPlaying(true);
        }
      }}
    >
      <Image
        src={thumbnailUrl}
        alt={alt}
        fill
        className="object-cover opacity-90 transition-opacity hover:opacity-100"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform hover:scale-110">
          <Play className="h-8 w-8 fill-white text-white" />
        </div>
      </div>
    </div>
  );
}
