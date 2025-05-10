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

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const AnswerForm = ({ questionId }: { questionId: string }) => {
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
      } else {
        toast.error("An error occurred while creating the answer", {
          description: error?.message || "Please try again later",
        });
      }
    });
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
        >
          {isAISubmitting ? (
            <>
              <RefreshCcw className="mr-2 size-4 animate-spin" />
              <span>Posting...</span>
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
