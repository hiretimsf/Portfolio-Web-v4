import React from "react";
import { iconMap } from "../../utils/maps";

type IconComponent = React.ComponentType<{
  className?: string;
}>;

interface PositionPositionProps {
  icon?: string | React.ReactNode | IconComponent;
  title: string;
}

export default function PositionPosition({
  icon,
  title,
}: PositionPositionProps) {
  let iconNode: React.ReactNode = null;

  if (typeof icon === "string") {
    const ResolvedIcon = iconMap[icon];
    if (ResolvedIcon) {
      if (typeof ResolvedIcon === "function") {
        iconNode = React.createElement(ResolvedIcon as IconComponent, {
          className: "size-4",
        });
      } else if (React.isValidElement(ResolvedIcon)) {
        iconNode = ResolvedIcon;
      }
    }
  } else if (typeof icon === "function") {
    iconNode = React.createElement(icon as IconComponent, {
      className: "size-4",
    });
  } else if (React.isValidElement(icon)) {
    iconNode = icon;
  } else if (icon) {
    iconNode = icon as React.ReactNode;
  }

  return (
    <div className="flex items-center gap-4 border-x border-black/10 dark:border-white/10 border-dashed px-4 py-4 md:gap-3 md:py-2">
      <div className="relative mx-auto flex items-center gap-3 text-center md:mx-0 md:text-left">
        {iconNode && (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-black/10 dark:border-white/10 md:size-6">
            {iconNode}
          </span>
        )}

        <h4 className="flex-1 text-xl font-medium text-balance">{title}</h4>
      </div>
    </div>
  );
}
