"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export type ReactionCounts = Record<ReactionType, number>;

export async function getReactions(slug: string) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  const [reactions, userReaction] = await Promise.all([
    prisma.postReaction.groupBy({
      by: ["reaction"],
      where: { slug },
      _count: {
        reaction: true,
      },
    }),
    prisma.postReaction.findUnique({
      where: {
        slug_ipHash: {
          slug,
          ipHash,
        },
      },
      select: { reaction: true },
    }),
  ]);

  const counts: ReactionCounts = {
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  reactions.forEach((r) => {
    if (r.reaction in counts) {
      counts[r.reaction as ReactionType] = r._count.reaction;
    }
  });

  return {
    counts,
    userReaction: (userReaction?.reaction as ReactionType) || null,
  };
}

export async function toggleReaction(slug: string, reaction: ReactionType) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  const existingReaction = await prisma.postReaction.findUnique({
    where: {
      slug_ipHash: {
        slug,
        ipHash,
      },
    },
  });

  if (existingReaction) {
    if (existingReaction.reaction === reaction) {
      // Toggle off
      await prisma.postReaction.delete({
        where: { id: existingReaction.id },
      });
    } else {
      // Change reaction
      await prisma.postReaction.update({
        where: { id: existingReaction.id },
        data: { reaction },
      });
    }
  } else {
    // New reaction
    await prisma.postReaction.create({
      data: {
        slug,
        reaction,
        ipHash,
      },
    });
  }

  revalidatePath(`/blog/post/${slug}`);
  return getReactions(slug);
}
