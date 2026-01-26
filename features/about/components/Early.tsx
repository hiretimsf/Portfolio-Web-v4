import EmbedVideos from "./EmbedVideos";
import { GET_EARLY_VIDEOS } from "../data/static";

export default function Early() {
  return <EmbedVideos videos={GET_EARLY_VIDEOS()} />;
}
