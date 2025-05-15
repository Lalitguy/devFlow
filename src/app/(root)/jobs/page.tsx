import React from "react";
import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/filter/JobsFilter";

import Pagination from "@/components/Pagination";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const userLocation = await fetchLocation();

  const jobs = await fetchJobs({
    query: `${query}, ${location}` || `Software Engineer in ${userLocation}`,
    page: page ?? 1,
  });

  const countries = await fetchCountries();
  const parsedPage = parseInt(page ?? 1);

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="flex flex-col gap-9 mt-11 mb-9 pb-9 light-border border-b">
        {jobs?.length > 0 ? (
          jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job, index: number) => (
              <JobCard key={`${job.job_id + index.toString()}`} job={job} />
            ))
        ) : (
          <div className="w-full text-dark200_light800 text-center paragraph-regular">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs?.length === 10} />
      )}
    </>
  );
};

export default Page;
