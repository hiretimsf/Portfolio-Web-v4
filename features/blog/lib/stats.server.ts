import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function getPostStats(slug: string) {
  const [stats, commentCount] = await Promise.all([
    prisma.postStats.findUnique({
      where: { slug },
      select: { views: true },
    }),
    prisma.comment.count({
      where: { postSlug: slug },
    }),
  ]);

  return {
    views: stats?.views ?? 0,
    comments: commentCount,
  };
}

export async function incrementView(slug: string, ipAddress?: string) {
  if (!ipAddress) {
    // If no IP provided, just return existing stats without incrementing
    // or maybe fallback to non-unique (depending on strictness preference)
    // Here we choose to skip increment if IP is missing to prevent abuse/errors
    const stats = await prisma.postStats.findUnique({ where: { slug } });
    return stats ?? { views: 0 };
  }

  const ipHash = crypto.createHash("sha256").update(ipAddress).digest("hex");

  // Try to create a unique view record
  try {
    await prisma.postView.create({
      data: {
        slug,
        ipHash,
      },
    });

    // If successful (no duplicate error), increment the aggregate view count
    return prisma.postStats.upsert({
      where: { slug },
      create: {
        slug,
        views: 1,
      },
      update: {
        views: {
          increment: 1,
        },
      },
    });
  } catch {
    // Unique constraint violation means user already viewed this post
    // Return current stats without incrementing
    const stats = await prisma.postStats.findUnique({ where: { slug } });
    return stats ?? { views: 0 };
  }
}
