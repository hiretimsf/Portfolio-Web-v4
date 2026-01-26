import EmbedVideos from "./EmbedVideos";
import { GET_ANDROID_VIDEOS } from "../data/static";

export default function Android() {
  return <EmbedVideos videos={GET_ANDROID_VIDEOS()} />;
}
