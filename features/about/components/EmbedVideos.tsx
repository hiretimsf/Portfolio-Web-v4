import type { EmbedVideoType } from "../types/EmbedVideoType";
import { Card } from "@/components/ui/card";
import BrowserWrapper from "@/components/common/BrowserWrapper";
import YouTubeEmbed from "@/components/common/YouTubeEmbed";

type EmbedVideosProps = {
  videos: EmbedVideoType[];
};

export default function EmbedVideos({ videos }: EmbedVideosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full mb-4">
      {videos.map((video) => (
        <EmbedVideoItem key={video.embedUrl} {...video} />
      ))}
    </div>
  );
}

type EmbedVideoItemProps = {
  embedUrl: string;
  embedAlt: string;
};

function EmbedVideoItem({ embedUrl, embedAlt }: EmbedVideoItemProps) {
  return (
    <Card
      className="h-full gap-0 rounded-md border-x border-b border-border-edge py-0 shadow-lg transition-all duration-300"
      role="article"
    >
      <BrowserWrapper>
        <div className="relative aspect-video w-full overflow-hidden">
          <YouTubeEmbed
            embedUrl={embedUrl}
            alt={embedAlt}
            className="absolute inset-0 h-full w-full dark:grayscale"
          />
        </div>
      </BrowserWrapper>
    </Card>
  );
}
