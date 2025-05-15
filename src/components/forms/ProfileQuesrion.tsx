"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import ROUTES from "@/constants/routes";

import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Success", {
          description: "Your profile has been updated successfully.",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="flex flex-col gap-9 mt-9 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border light-border-2 min-h-[56px] text-dark300_light700 no-focus paragraph-regular background-light800_dark300"
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border light-border-2 min-h-[56px] text-dark300_light700 no-focus paragraph-regular background-light800_dark300"
                  placeholder="Your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Portfolio Link
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="border light-border-2 min-h-[56px] text-dark300_light700 no-focus paragraph-regular background-light800_dark300"
                  placeholder="Your Portfolio link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Location <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border light-border-2 min-h-[56px] text-dark300_light700 no-focus paragraph-regular background-light800_dark300"
                  placeholder="Where do you live?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="border light-border-2 min-h-[56px] text-dark300_light700 no-focus paragraph-regular background-light800_dark300"
                  placeholder="What's special about you?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-7">
          <Button
            type="submit"
            className="w-fit primary-gradient"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
