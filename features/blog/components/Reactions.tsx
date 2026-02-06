"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getReactions, toggleReaction, type ReactionCounts } from "@/features/blog/actions/reactions";

type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

interface ReactionsProps {
  slug: string;
  className?: string;
}

export default function Reactions({ slug, className }: ReactionsProps) {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [counts, setCounts] = useState<ReactionCounts | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getReactions(slug).then((data) => {
      if (mounted) {
        setCounts(data.counts);
        setSelectedReaction(data.userReaction as ReactionType | null);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleReactionClick = async (type: ReactionType) => {
    if (isLoading) return;
    
    // Optimistic update
    const previousSelected = selectedReaction;
    const previousCounts = counts ? { ...counts } : null;

    // Calculate new state
    const newSelected = selectedReaction === type ? null : type;
    
    // Update local counts optimistically
    const newCounts = counts ? { ...counts } : { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
    if (previousSelected) {
      newCounts[previousSelected]--;
    }
    if (newSelected) {
      newCounts[newSelected]++;
    }

    setSelectedReaction(newSelected);
    setCounts(newCounts);
    setIsLoading(true);

    try {
      const result = await toggleReaction(slug, type);
      setCounts(result.counts);
      setSelectedReaction(result.userReaction as ReactionType | null);
    } catch (error) {
      // Revert on error
      console.error("Failed to toggle reaction:", error);
      setSelectedReaction(previousSelected);
      setCounts(previousCounts);
    } finally {
        setIsLoading(false);
    }
  };

  const reactions: { type: ReactionType; label: string; icon: string }[] = [
    { type: "like", label: "Like", icon: "👍" },
    { type: "love", label: "Love", icon: "❤️" },
    { type: "haha", label: "Haha", icon: "😂" },
    { type: "wow", label: "Wow", icon: "😮" },
    { type: "sad", label: "Sad", icon: "😢" },
    { type: "angry", label: "Angry", icon: "😡" },
  ];

  return (
    <div className={cn("flex w-full flex-col items-center gap-4 py-6", className)}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        What do you think?
      </h3>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4">
        {reactions.map((reaction) => {
          const count = counts?.[reaction.type] || 0;
          const isSelected = selectedReaction === reaction.type;
          
          return (
            <button
              key={reaction.type}
              onClick={() => handleReactionClick(reaction.type)}
              className="group relative flex flex-col items-center"
              disabled={isLoading}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center text-3xl transition-all duration-300 sm:h-12 sm:w-12 sm:text-4xl",
                  "grayscale group-hover:grayscale-0 group-hover:scale-125",
                  isSelected && "grayscale-0 scale-125",
                  isLoading && "cursor-wait opacity-80"
                )}
              >
                {reaction.icon}
              </div>
              
              {count > 0 && (
                <div className={cn(
                  "absolute -top-1 -right-2 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-background transition-all duration-300",
                  isSelected ? "scale-100 opacity-100" : "scale-90 opacity-90 group-hover:scale-100 group-hover:opacity-100"
                )}>
                  {count > 99 ? "99+" : count}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
