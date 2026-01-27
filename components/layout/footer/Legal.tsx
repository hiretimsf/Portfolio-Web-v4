import Link, {
  LINK_DEFAULT_STYLE,
} from "@/components/layout/footer/Link";
import Section from "@/components/layout/footer/Section";
import Divider from "@/components/layout/footer/Divider";
import { COPYRIGHT_LINKS } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Legal() {
  const renderLink = (key: keyof typeof COPYRIGHT_LINKS) => {
    const link = COPYRIGHT_LINKS[key];
    if (!link) return null;
    const Icon = link.icon;

    return (
      <Link
        href={link.href}
        icon={<Icon className={cn(LINK_DEFAULT_STYLE, "size-4")} />}
        label={link.label}
        ariaLabel={link.ariaLabel}
      />
    );
  };

  return (
    <>
      {/* Desktop View */}
      <Section
        className="hidden sm:block"
        innerClassName="max-w-2xl flex-col sm:flex-row"
      >
        {renderLink("privacy")}
        <Divider />
        {renderLink("copyright")}
        <Divider />
        {renderLink("terms")}
      </Section>

      {/* Mobile View */}
      <Section
        className="sm:hidden"
        innerClassName="max-w-2xl divide-x divide-black/10 dark:divide-white/10"
      >
        <div className="flex items-center justify-center gap-3">
          {renderLink("privacy")}
        </div>
        <div className="flex items-center justify-center gap-3">
          {renderLink("terms")}
        </div>
      </Section>
      <Section
        className="sm:hidden"
        innerClassName="max-w-2xl border-b border-edge"
      >
        <div className="flex items-center justify-center py-2">
          {renderLink("copyright")}
        </div>
      </Section>
    </>
  );
}
