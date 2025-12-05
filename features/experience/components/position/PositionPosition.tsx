import React from "react";

type IconComponent = React.ComponentType<{
  className?: string;
}>;

interface PositionPositionProps {
  icon: React.ReactNode | IconComponent;
  title: string;
}

export default function PositionPosition({
  icon,
  title,
}: PositionPositionProps) {
  let iconNode: React.ReactNode = null;

  if (typeof icon === "function") {
    iconNode = React.createElement(icon as IconComponent, {
      className: "size-4",
    });
  } else if (React.isValidElement(icon)) {
    iconNode = icon;
  } else if (icon) {
    iconNode = icon;
  }

  return (
    <div className="flex items-center gap-4 border-x border-border-edge border-dashed px-4 py-4 md:gap-3 md:py-2">
      <div className="relative z-10 mx-auto flex items-center gap-3 text-center md:mx-0 md:text-left">
        {iconNode && (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border-edge border-dashed md:size-6">
            {iconNode}
          </span>
        )}

        <h4 className="flex-1 text-2xl font-medium text-balance md:text-lg">
          {title}
        </h4>
      </div>
    </div>
  );
}
