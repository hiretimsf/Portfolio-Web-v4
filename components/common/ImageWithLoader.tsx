"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: () => void;
}

export default function ImageWithLoader({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
  unoptimized = false,
  ...props
}: ImageWithLoaderProps & { fill?: boolean; unoptimized?: boolean }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "")}>
      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <svg
            className="h-10 w-10 animate-spin text-gray-400 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        unoptimized={unoptimized}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={props.onError}
      />
    </div>
  );
}
