import { GET_WEB_APPS } from "../data/source";
import Projects from "./Projects";

export default function Web() {
  const webApps = GET_WEB_APPS();

  return <Projects data={webApps} />;
}
