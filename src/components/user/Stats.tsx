import Image from "next/image";
import React from "react";
import { formatNumber } from "@/lib/utils";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-4 shadow-light-300 dark:shadow-dark-200 p-6 border light-border rounded-md background-light900_dark300">
      <Image src={imgUrl} alt="gold medal icon" width={40} height={50} />
      <div>
        <p className="text-dark200_light900 paragraph-semibold">{value}</p>
        <p className="text-dark400_light700 body-medium">{title}</p>
      </div>
    </div>
  );
};

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: Badges;
  repuatation: number;
}

const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  repuatation,
}: Props) => {
  return (
    <div className="mt-10">
      <h4 className="text-dark200_light900 h3-semibold">
        Stats{" "}
        <span className="primary-text-gradient small-semibold">
          {formatNumber(repuatation)}
        </span>
      </h4>

      <div className="gap-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 mt-5">
        <div className="flex flex-wrap justify-evenly items-center gap-4 shadow-light-300 dark:shadow-dark-200 p-6 border light-border rounded-md background-light900_dark300">
          <div>
            <p className="text-dark200_light900 paragraph-semibold">
              {formatNumber(totalQuestions)}
            </p>
            <p className="text-dark400_light700 body-medium">Questions</p>
          </div>

          <div>
            <p className="text-dark200_light900 paragraph-semibold">
              {formatNumber(totalAnswers)}
            </p>
            <p className="text-dark400_light700 body-medium">Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />

        <StatsCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />

        <StatsCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
