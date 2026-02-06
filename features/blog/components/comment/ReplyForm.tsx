"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

const commentSchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(1000, "Reply is too long"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface ReplyFormProps {
  slug: string;
  parentId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReplyForm({ slug, parentId, onSuccess, onCancel }: ReplyFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: CommentFormValues) {
    if (!session) {
      toast.error("Please sign in to reply");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          content: values.content,
          parentId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to post reply");
      }

      toast.success("Reply posted successfully!");
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      onSuccess?.();
    } catch (error) {
      console.error("Reply submission error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session) {
      return (
          <div className="p-4 bg-muted/30 rounded-lg text-center text-sm">
              Please <span className="font-semibold cursor-pointer underline">login</span> to reply.
          </div>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a reply..."
                  className="min-h-[80px] text-sm resize-none bg-background focus-visible:ring-1"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
            {onCancel && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            )}
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting || !form.watch("content")?.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Reply
              </>
            ) : (
              "Reply"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
