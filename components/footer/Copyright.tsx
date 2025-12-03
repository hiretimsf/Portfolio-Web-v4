import FooterLink, {
  FOOTER_LINK_DEFAULT_STYLE,
} from "@/components/footer/FooterLink";
import Separator from "@/components/footer/Separator";
import { cn } from "@/lib/utils";

import { LockIcon, FileTextIcon, CopyrightIcon } from "lucide-react";

export default function Copyright() {
  return (
    <div className="screen-line-after max-w-5xl w-full mx-auto border-x border-edge">
      <div className="mx-auto max-w-2xl flex items-center justify-center gap-3 px-4 border-x border-edge sm:flex-row flex-col">
        <FooterLink
          href="/privacy"
          icon={
            <LockIcon className={cn(FOOTER_LINK_DEFAULT_STYLE, "size-4")} />
          }
          label="Privacy Policy"
          ariaLabel="View privacy policy"
          hideOnMobile={true}
        />
        <Separator />
        <FooterLink
          href="/"
          icon={
            <CopyrightIcon
              className={cn(FOOTER_LINK_DEFAULT_STYLE, "size-4")}
            />
          }
          label={`${new Date().getFullYear()} - All rights reserved.`}
          ariaLabel="View copyright information"
        />
        <Separator />
        <FooterLink
          href="/terms"
          icon={
            <FileTextIcon className={cn(FOOTER_LINK_DEFAULT_STYLE, "size-4")} />
          }
          label="Terms of Service"
          ariaLabel="View terms of service"
          hideOnMobile={true}
        />
      </div>
    </div>
  );
}
