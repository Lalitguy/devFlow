import React from "react";
import Image from "next/image";
import Link from "next/link";

import { processJobTitle } from "@/lib/utils";

interface JobLocationProps {
  job_country?: string;
  job_city?: string;
  job_state?: string;
}

const JobLocation = ({
  job_country,
  job_city,
  job_state,
}: JobLocationProps) => {
  return (
    <div className="flex justify-end items-center gap-2 px-3 py-1.5 rounded-2xl background-light800_dark400">
      <Image
        src={`https://flagsapi.com/${job_country}/flat/64.png`}
        alt="country symbol"
        width={16}
        height={16}
        className="rounded-full"
      />

      <p className="text-dark400_light700 body-medium">
        {job_city && `${job_city}, `}
        {job_state && `${job_state}, `}
        {job_country && `${job_country}`}
      </p>
    </div>
  );
};

const JobCard = ({ job }: { job: Job }) => {
  const {
    employer_logo,
    employer_website,
    job_employment_type,
    job_title,
    job_description,
    job_apply_link,
    job_city,
    job_state,
    job_country,
  } = job;

  return (
    <section className="flex sm:flex-row flex-col items-start gap-6 shadow-light100_darknone p-6 sm:p-8 border light-border rounded-lg background-light900_dark200">
      <div className="sm:hidden flex justify-end w-full">
        <JobLocation
          job_country={job_country}
          job_city={job_city}
          job_state={job_state}
        />
      </div>

      <div className="flex items-center gap-6">
        {employer_logo ? (
          <Link
            href={employer_website ?? "/jobs"}
            className="relative rounded-xl size-16 background-light800_dark400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={employer_logo}
              alt="company logo"
              fill
              className="p-2 size-full object-contain"
            />
          </Link>
        ) : (
          <Image
            src="/images/site-logo.svg"
            alt="default site logo"
            width={64}
            height={64}
            className="rounded-[10px]"
          />
        )}
      </div>

      <div className="w-full">
        <div className="flex-wrap flex-between gap-2">
          <p className="text-dark200_light900 base-semibold">
            {processJobTitle(job_title)}
          </p>

          <div className="hidden sm:flex">
            <JobLocation
              job_country={job_country}
              job_city={job_city}
              job_state={job_state}
            />
          </div>
        </div>

        <p className="mt-2 text-dark500_light700 line-clamp-2 body-regular">
          {job_description?.slice(0, 200)}
        </p>

        <div className="flex-wrap flex-between gap-6 mt-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />

              <p className="text-light-500 body-medium">
                {job_employment_type}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/icons/currency-dollar-circle.svg"
                alt="dollar symbol"
                width={20}
                height={20}
              />

              <p className="text-light-500 body-medium">Not disclosed</p>
            </div>
          </div>

          <Link
            href={job_apply_link ?? "/jobs"}
            target="_blank"
            className="flex items-center gap-2"
          >
            <p className="primary-text-gradient body-semibold">View job</p>

            <Image
              src="/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
