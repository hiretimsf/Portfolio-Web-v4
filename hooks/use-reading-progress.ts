"use client";

import { useEffect, useState } from "react";

export function useReadingProgress() {
	const [completion, setCompletion] = useState(0);

	useEffect(() => {
		function updateScrollCompletion() {
			const currentProgress = window.scrollY;
			const scrollHeight = document.body.scrollHeight - window.innerHeight;

			if (scrollHeight > 0) {
				setCompletion(
					Number((currentProgress / scrollHeight) * 100).toFixed(
						0,
					) as unknown as number,
				);
			}
		}

		window.addEventListener("scroll", updateScrollCompletion);
		updateScrollCompletion();

		return () => {
			window.removeEventListener("scroll", updateScrollCompletion);
		};
	}, []);

	return completion;
}
