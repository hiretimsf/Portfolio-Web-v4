import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const postCommentSchema = z.object({
  slug: z.string(),
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
  parentId: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Fetch comments with likes relation
    const commentsFlat = await prisma.comment.findMany({
      where: { postSlug: slug },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
        likes: true, // Fetch all likes to aggregate in memory (or use _count if preferred, but we need user specific check too)
      },
      orderBy: { createdAt: "asc" },
    });

    // Process comments to add counts and user status
    const commentsWithLikes = commentsFlat.map((comment) => {
      const { likes: likeRelations, ...commentData } = comment;
      const likes = likeRelations.filter((l) => l.isLike).length;
      const dislikes = likeRelations.filter((l) => !l.isLike).length;
      
      let userLike = null;
      if (session) {
        const userAction = likeRelations.find((l) => l.userId === session.user.id);
        if (userAction) {
          userLike = userAction.isLike;
        }
      }
      
      return {
        ...commentData,
        likes,
        dislikes,
        userLike, // true, false, or null
      };
    });

    return NextResponse.json(commentsWithLikes);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = postCommentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error?.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { slug, content, parentId } = result.data;

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
        select: { id: true, postSlug: true },
      });

      if (!parentComment || parentComment.postSlug !== slug) {
        return NextResponse.json(
          { error: "Invalid parent comment for this post" },
          { status: 400 },
        );
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postSlug: slug,
        userId: session.user.id,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
