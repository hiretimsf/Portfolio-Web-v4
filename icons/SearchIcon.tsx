"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface SearchIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SearchIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: string;
    className?: string;
}

const svgVariants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: {
		rotate: [0, -10, 10, -5, 5, 0],
	},
};

const svgTransition: Transition = {
	duration: 1.2,
	ease: "easeInOut",
};

const SearchIcon = forwardRef<SearchIconHandle, SearchIconProps>(
	({ onMouseEnter, onMouseLeave, className = "size-5 shrink-0 text-foreground", size = 24, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter],
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave],
		);

		return (
			<div
				className={cn(className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					className={cn(className)}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					animate={controls}
					transition={svgTransition}
				>
					<path d="m21 21-4.34-4.34" />
					<circle cx="11" cy="11" r="8" />
				</motion.svg>
			</div>
		);
	},
);

SearchIcon.displayName = "SearchIcon";

export { SearchIcon };
export default SearchIcon;
