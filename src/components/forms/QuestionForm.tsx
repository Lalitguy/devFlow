"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async () => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark400_light700 paragraph-semibold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder="What is your question?"
                  {...field}
                  className="border light-border-2 rounded-1.5 min-h-[56px] text-dark-300_light700 paragraph-regular background-light700_dark300 no-focus"
                />
              </FormControl>
              <FormDescription className="text-light-500 body-regula">
                {" "}
                Be specific and imagine you are askinng question to another dev.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark400_light700 paragraph-semibold">
                Detail Explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  markdown=""
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-light-500 body-regular">
                Introduce the problem and expand on what you put in the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"tags"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-dark400_light700 paragraph-semibold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    type={"text"}
                    placeholder="Add tags to your question"
                    {...field}
                    className="border light-border-2 rounded-1.5 min-h-[56px] text-dark-300_light700 paragraph-regular background-light700_dark300 no-focus"
                  />
                  Tags
                </div>
              </FormControl>
              <FormDescription className="text-light-500 body-regular">
                Add upto 5 tags to describe your question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-10 lg:mt-16">
          <Button
            type="submit"
            className="w-fit !text-light-900 primary-gradient"
          >
            Ask Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
