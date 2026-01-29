import Link, {
  LINK_DEFAULT_STYLE,
} from "@/components/layout/footer/Link";
import Section from "@/components/layout/footer/Section";
import Divider from "@/components/layout/footer/Divider";
import { BOTTOM_NAV_LINKS } from "@/lib/config";
import { cn } from "@/lib/utils";
import React from "react";
import CornerDecorations from "@/components/common/CornerDecorations";

export default function Nav() {
  return (
    <Section innerClassName="max-w-md">
      <CornerDecorations top={true}/>
      {BOTTOM_NAV_LINKS.map((link, index) => {
        const Icon = link.icon;
        return (
          <React.Fragment key={link.href}>
            <Link
              href={link.href}
              target={link.target}
              icon={
                <Icon
                  aria-hidden="true"
                  className={cn(LINK_DEFAULT_STYLE, "size-[18px]")}
                />
              }
              label={link.label}
              ariaLabel={link.ariaLabel}
            />
            {index < BOTTOM_NAV_LINKS.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </Section>
  );
}
