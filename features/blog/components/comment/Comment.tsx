"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { formatDistanceToNow } from "date-fns";
import { Loader2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReplyForm } from "./ReplyForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

interface CommentUser {
  id: string;
  name: string;
  image?: string;
}

interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  parentId?: string | null;
  children?: CommentType[];
  likes: number;
  dislikes: number;
  userLike: boolean | null;
}

type SessionLike = {
  user?: {
    id?: string;
    role?: string;
  };
} | null;

type CommentNode = Omit<CommentType, "children">;

interface CommentProps {
  slug: string;
}

export function Comment({ slug }: CommentProps) {
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", slug],
    queryFn: async () => {
      const res = await fetch(`/api/comments?slug=${slug}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      return buildCommentTree(data);
    },
  });

  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className=" w-full mx-auto items-center justify-center flex">

      
      {/* List of comments */}
      <div className="max-w-2xl w-full border-0 md:border-x border-black/10 dark:border-white/10 border-dashed">
        {comments.map((comment: CommentType, index: number) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            slug={slug}
            session={session}
            className={cn(
              "px-6 py-4",
              index !== comments.length - 1 && "border-b border-black/10 dark:border-white/10 border-dashed"
            )}
          />
        ))}
        {comments.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
    </div>
  );
}

function CommentItem({
  comment,
  slug,
  session,
  className,
}: {
  comment: CommentType;
  slug: string;
  session: SessionLike;
  className?: string;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [userLike, setUserLike] = useState<boolean | null>(comment.userLike);
  const queryClient = useQueryClient();

  useEffect(() => {
    setLikes(comment.likes);
    setDislikes(comment.dislikes);
    setUserLike(comment.userLike);
  }, [comment.likes, comment.dislikes, comment.userLike]);

  const isOwner = session?.user?.id === comment.user.id;
  const isAdmin = session?.user?.role === "ADMIN";
  const canDelete = isOwner || isAdmin;

  const handleVote = async (isLike: boolean) => {
    if (!session) {
      toast.error("Please sign in to vote");
      return;
    }

    const previousState = { likes, dislikes, userLike };

    // Optimistic Update
    if (userLike === isLike) {
      // Toggle off
      setUserLike(null);
      if (isLike) setLikes((prev) => prev - 1);
      else setDislikes((prev) => prev - 1);
    } else {
      // Change vote or new vote
      if (userLike === null) {
        // New vote
        if (isLike) setLikes((prev) => prev + 1);
        else setDislikes((prev) => prev + 1);
      } else {
        // Change vote (e.g. like -> dislike)
        if (isLike) {
           setLikes((prev) => prev + 1);
           setDislikes((prev) => prev - 1);
        } else {
           setLikes((prev) => prev - 1);
           setDislikes((prev) => prev + 1);
        }
      }
      setUserLike(isLike);
    }

    try {
      const res = await fetch(`/api/comments/${comment.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLike }),
      });

      if (!res.ok) throw new Error("Failed to vote");
      
      // Optional: Sync with server response if needed, but invalidating queries is enough
      // const data = await res.json();
      // setUserLike(data.userLike);
      // setLikes(data.likes);
      // setDislikes(data.dislikes);
      
      // Invalidate silently to update other components/cache eventually
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    } catch {
      // Revert
      setLikes(previousState.likes);
      setDislikes(previousState.dislikes);
      setUserLike(previousState.userLike);
      toast.error("Failed to submit vote");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      
      toast.success("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn("flex gap-4", className)}>
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={comment.user.image} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          {canDelete && (
             <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" // Note: Need group on parent or just remove opacity logic if no group class.
                onClick={handleDelete}
                disabled={isDeleting}
             >
                <Trash2 className="h-4 w-4" />
             </Button>
          )}
        </div>
        
        <div className="text-sm leading-relaxed whitespace-pre-wrap dark:text-gray-300 text-gray-700 text-left">
            {comment.content}
        </div>

        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 hover:bg-transparent ${userLike === true ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => handleVote(true)}
            >
              <ThumbsUp className={`h-4 w-4 ${userLike === true ? "fill-current" : ""}`} />
            </Button>
            <span className="text-xs text-muted-foreground">{likes}</span>
          </div>

          <div className="flex items-center gap-1">
             <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 hover:bg-transparent ${userLike === false ? "text-destructive" : "text-muted-foreground"}`}
              onClick={() => handleVote(false)}
            >
              <ThumbsDown className={`h-4 w-4 ${userLike === false ? "fill-current" : ""}`} />
            </Button>
            <span className="text-xs text-muted-foreground">{dislikes}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
            Reply
          </Button>
        </div>

        {isReplying && (
          <div className="pt-4 pl-4 border-l-2 border-muted">
            <ReplyForm
              slug={slug}
              parentId={comment.id}
              onSuccess={() => {
                setIsReplying(false);
              }}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}

        {/* Nested Comments */}
        {comment.children && comment.children.length > 0 && (
          <div className="pt-4 space-y-6">
            {comment.children.map((child: CommentType) => (
              <CommentItem
                key={child.id}
                comment={child}
                slug={slug}
                session={session}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function buildCommentTree(comments: CommentNode[]): CommentType[] {
  const map = new Map<string, CommentType>();
  const roots: CommentType[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, children: [] });
  });

  comments.forEach((original) => {
    const comment = map.get(original.id);
    if (!comment) return;

    if (original.parentId && map.has(original.parentId)) {
      map.get(original.parentId)?.children?.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
}
