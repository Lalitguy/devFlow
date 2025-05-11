import { DataState, DEFAULT_ERROR } from "@/constants/states";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface DataRendererProps<T> {
  success: boolean;
  error?: ErrorType;
  data: T[] | undefined;
  empty: DataState;
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button:
    | {
        text: string;
        href: string;
      }
    | undefined;
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="flex flex-col justify-center items-center mt-16 sm:mt-36 w-full">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden dark:block object-contain"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="dark:hidden block object-contain"
      />
    </>
    <h2 className="mt-8 text-dark200_light900 h2-bold">{title}</h2>
    <p className="my-3.5 max-w-md text-dark500_light700 text-center body-regular">
      {message}
    </p>
    {button && (
      <Link href={button.href}>
        <Button className="bg-primary-500 hover:bg-primary-500 mt-5 px-4 py-3 rounded-lg min-h-[46px] text-light-900 paragraph-medium">
          {button.text}
        </Button>
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty,
  render,
}: DataRendererProps<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        image={{
          light: "/images/light-error.webp",
          dark: "/images/dark-error.webp",
          alt: "Error state illustration",
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }
  if (!data || data.length === 0)
    return (
      <StateSkeleton
        image={{
          light: "/images/light-illustration.webp",
          dark: "/images/dark-illustration.webp",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  return <div>{render(data)}</div>;
};

export default DataRenderer;
