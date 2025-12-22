"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/features/contact/helpers/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { trackEvent, captureException } from "@/lib/events";

export function ContactForm() {
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation schema and default values
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: ContactFormValues) {
    try {
      setIsSubmitting(true);

      // Send form data to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific Resend API domain verification error
        if (
          data.name === "validation_error" &&
          typeof data.message === "string" &&
          data.message.includes("domain is not verified")
        ) {
          toast.error(
            "Email service is temporarily unavailable. Please try again later or contact us directly.",
          );
          return;
        }

        throw new Error(data.error || "Something went wrong");
      }

      // Show success message and reset form
      toast.success("Message sent successfully!");

      // Track successful contact form submission
      trackEvent({
        name: "contact_form_submitted",
        properties: {
          success: true,
        },
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      // Track failed contact form submission
      trackEvent({
        name: "contact_form_failed",
        properties: {
          error_message:
            error instanceof Error ? error.message : "Unknown error",
        },
      });

      // Capture exception for error tracking
      if (error instanceof Error) {
        captureException(error, { context: "contact_form" });
      }

      // Provide a more user-friendly error message
      toast.error(
        "Failed to send message. Please try again later or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
        <div className="border-b border-border-edge border-dashed w-full mx-auto items-center justify-center flex">
          {/* Name input field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="max-w-xl w-full border-x border-border-edge border-dashed px-6 py-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-b border-border-edge border-dashed w-full mx-auto items-center justify-center flex">
          {/* Email input field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="max-w-xl w-full border-x border-border-edge border-dashed px-6 py-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-b border-border-edge border-dashed w-full mx-auto items-center justify-center flex">
          {/* Message textarea field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="max-w-xl w-full border-x border-border-edge border-dashed px-6 py-4">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-w-xl mx-auto items-center justify-center flex border-x border-border-edge border-dashed px-6 py-2">
          {/* Submit button with loading state */}
          <Button
            variant="outline"
            type="submit"
            disabled={isSubmitting}
            className="max-w-xl w-full"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
