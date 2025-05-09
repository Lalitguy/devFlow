"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { KeyboardEvent, useRef, useTransition } from "react";
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
import { z } from "zod";
import TagCard from "../cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { RefreshCcw } from "lucide-react";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface QuestionFormProps {
  question?: QuestionI;
  isEdit?: boolean;
}
const QuestionForm = ({ question, isEdit = false }: QuestionFormProps = {}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      let result = null;
      if (isEdit && question) {
        result = await editQuestion({
          questionId: question._id,
          ...data,
        });
      } else {
        result = await createQuestion(data);
      }

      if (result.success) {
        toast.success("Success", {
          description: isEdit
            ? "Question updated successfully"
            : "Question created successfully",
        });
        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error(`Error ${result?.status}`, {
          description: result?.error?.message || "An error occurred",
          richColors: true,
          position: "top-center",
        });
      }
    });
  };

  const handleKeyUp = (
    e: KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Please add at least one tag",
      });
    }
  };

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
                    placeholder="Add tags..."
                    className="border light-border-2 rounded-1.5 min-h-[56px] text-dark-300_light700 paragraph-regular background-light700_dark300 no-focus"
                    onKeyDown={(e) => handleKeyUp(e, field)}
                  />
                  {field?.value?.length > 0 && (
                    <div className="flex flex-wrap flex-start gap-2.5 mt-2.5">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
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
            {isPending ? (
              <>
                <RefreshCcw className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : isEdit ? (
              "Edit"
            ) : (
              "Ask Question"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
