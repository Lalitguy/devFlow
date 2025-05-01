"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

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
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  formType: "SIGN_UP" | "SIGN_IN";
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}
const AuthForm = <T extends FieldValues>({
  formType,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    //Todo Auth
    console.log(onSubmit);
  };

  const btnText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10"
      >
        {Object.keys(defaultValues).map((key) => {
          const fieldName =
            key === "email"
              ? "Email Address"
              : key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as Path<T>}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5 w-full">
                  <FormLabel className="text-dark400_light700 paragraph-medium">
                    {fieldName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      placeholder={`Enter ${fieldName}`}
                      {...field}
                      className="border light-border-2 rounded-1.5 min-h-12 text-dark-300_light700 paragraph-regular background-light900_dark300 no-focus"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button
          disabled={form.formState.isSubmitting}
          className="px-4 py-3 rounded-2 w-full min-h-12 font-inter !text-light-900 primary-gradient paragraph-medium"
        >
          {form.formState.isSubmitting
            ? btnText === "Sign In"
              ? "Signing In"
              : "Signing Up"
            : btnText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p className="text-right">
            New here ?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="primary-text-gradient paragraph-semibold primary"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-right">
            Already Registered ?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="primary-text-gradient paragraph-semibold primary"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
