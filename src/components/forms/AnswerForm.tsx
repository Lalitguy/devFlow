"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { RefreshCcw } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface AnswerFormProps {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({
  questionId,
  questionTitle,
  questionContent,
}: AnswerFormProps) => {
  const session = useSession();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (value: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const { success, error } = await createAnswer({
        questionId,
        content: value.content,
      });

      if (success) {
        form.reset();
        toast.success("Answer created successfully", {
          description: "Your answer has been posted successfully",
        });

        if (editorRef.current) editorRef.current.setMarkdown("");
      } else {
        toast.error("An error occurred while creating the answer", {
          description: error?.message || "Please try again later",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error("You need to be signed in to use this feature", {
        description:
          "You need to be signed in to use this feature, please sign in to use this feature",
      });
    }
    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown();

    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer
      );

      if (!success || !data?.length) {
        return toast.error("An error occurred while generating the AI answer", {
          description:
            error instanceof Error ? error.message : "Please try again later",
        });
      }

      const formattedData = data.replace(/<br>/g, "").toString().trim();
      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedData);
        form.setValue("content", formattedData);
        form.trigger("content");
      }

      toast.success("AI answer generated successfully", {
        description: "Your AI answer has been generated successfully",
      });
    } catch (error) {
      toast.error("An error occurred while generating the AI answer", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
      setIsAISubmitting(false);
    } finally {
      setIsAISubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-5 sm:gap-2">
        <h4 className="text-dark400_light800 paragraph-semibold">
          Write your answer here
        </h4>
        <Button
          type="submit"
          disabled={isAISubmitting}
          className="gap-1.5 shadow-none px-4 py-2.5 border light-border-2 rounded-md text-primary-500 dark:text-primary-500 btn"
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <RefreshCcw className="mr-2 size-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Image
                src={"/icons/stars.svg"}
                alt="Generate AI Answer"
                width={16}
                height={16}
                className={"object-contain"}
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-10 mt-6 w-full"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name={"content"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormControl className="mt-3.5">
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                    markdown=""
                  />
                </FormControl>
                <FormDescription className="text-light-500 body-regula">
                  Be specific and imagine you are askinng question to another
                  dev.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isAnswering}
              className="primary-gradient"
            >
              {isAnswering ? (
                <>
                  <RefreshCcw className="mr-2 size-4 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
