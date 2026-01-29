import TechStack from "@/components/layout/footer/TechStack";
import Nav from "@/components/layout/footer/Nav";
import Inspiration from "@/components/layout/footer/Inspiration";
import Legal from "@/components/layout/footer/Legal";
import Divider from "@/components/Divider";

export default function Footer() {
  return (
    <footer className="w-full mx-auto">
      <Inspiration />
      <TechStack />
      <Divider short={true} />
      <Nav />
      <Legal />
    </footer>
  );
}
