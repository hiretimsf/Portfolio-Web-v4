"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  slug: string;
  parentId?: string;
  onSuccess?: () => void;
}

import { useQueryClient } from "@tanstack/react-query";

export function CommentForm({ slug, parentId, onSuccess }: CommentFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: CommentFormValues) {
    if (!session) {
      setIsLoginOpen(true);
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
            parentId
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to post comment");
      }

      toast.success("Comment posted successfully!");
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      onSuccess?.(); // Keep it for closing reply forms
    } catch (error) {
      console.error("Comment submission error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: window.location.href,
        fetchOptions: {
            onSuccess: () => {
                toast.success("Redirecting to login...");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            }
        }
      });
    } catch (error) {
      console.error("Social login error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to initiate login");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto relative">

              <div className="border-b border-black/10 dark:border-white/10 md:border-dashed w-full mx-auto items-center justify-center flex">
                 <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="max-w-2xl w-full border-0 md:border-x border-black/10 dark:border-white/10 border-dashed px-6 py-4">
                        <div className="flex gap-4">
                            {session && (
                                <Avatar className="h-10 w-10 border border-black/10 dark:border-white/10">
                                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className="flex-1">
                                <FormControl>
                                  <Textarea
                                    placeholder={parentId ? "Write a reply..." : "Leave a comment..."}
                                    className="min-h-[100px] resize-none bg-transparent border-none focus-visible:ring-0 p-0 text-base placeholder:text-muted-foreground/70"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
            <div className="max-w-2xl mx-auto items-center justify-end flex border-0 md:border-x border-black/10 dark:border-white/10 md:border-dashed px-6 py-4">
                {session ? (
                    <div className="flex items-center gap-2 w-full justify-between">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Commenting as <span className="font-medium text-foreground">{session.user.name}</span></span>
                     </div>
                     <div className="flex items-center gap-2">
                         <Button
                             type="button"
                             variant="ghost"
                             onClick={() => signOut()}
                             disabled={isSubmitting}
                             size="sm"
                             className="text-muted-foreground hover:text-foreground"
                         >
                             Sign out
                         </Button>
                         <Button
                             type="submit"
                             disabled={isSubmitting || !form.watch("content")?.trim()}
                             className="min-w-[100px]"
                             size="sm"
                         >
                             {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                             ) : (
                                "Post Comment"
                             )}
                        </Button>
                     </div>
                   </div>
                ) : (
                    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" type="button">Login to Comment</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Sign in to comment</DialogTitle>
                                <DialogDescription>
                                    Connect with your account to join the conversation.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                <Button variant="outline" onClick={() => handleSocialLogin('google')} className="w-full flex items-center gap-2">
                                    <FcGoogle size={20} />
                                    Continue with Google
                                </Button>
                                <Button variant="outline" onClick={() => handleSocialLogin('github')} className="w-full flex items-center gap-2">
                                    <FaGithub size={20} />
                                    Continue with GitHub
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </form>
      </Form>
    </>
  );
}
