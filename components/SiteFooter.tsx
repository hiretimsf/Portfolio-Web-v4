import TechStacks from "@/components/footer/TechStacks";
import BottomLinks from "@/components/footer/BottomLinks";

export function SiteFooter() {
  return (
    <footer className="w-full mx-auto overflow-x-hidden">
      <div className="screen-line-before max-w-5xl w-full mx-auto border-x border-edge pt-4">
        <TechStacks />

        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <BottomLinks />
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
