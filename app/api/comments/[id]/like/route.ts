import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const likeSchema = z.object({
  isLike: z.boolean(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: commentId } = await params;
    const body = await req.json();
    const result = likeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { isLike } = result.data;
    const userId = session.user.id;

    // Check existing like/dislike
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });

    if (existingLike) {
      if (existingLike.isLike === isLike) {
        // Toggle off (remove)
        await prisma.commentLike.delete({
          where: { id: existingLike.id },
        });
      } else {
        // Change vote
        await prisma.commentLike.update({
          where: { id: existingLike.id },
          data: { isLike },
        });
      }
    } else {
      // Create new
      await prisma.commentLike.create({
        data: {
          commentId,
          userId,
          isLike,
        },
      });
    }

    // Get updated counts
    const [likes, dislikes] = await Promise.all([
      prisma.commentLike.count({
        where: { commentId, isLike: true },
      }),
      prisma.commentLike.count({
        where: { commentId, isLike: false },
      }),
    ]);

    return NextResponse.json({
      likes,
      dislikes,
      userLike: existingLike?.isLike === isLike ? null : isLike, // If we deleted, it's null. If we updated/created, it's `isLike`.
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
