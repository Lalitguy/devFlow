import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const sampleQuestion = {
  id: "q123",
  title: "How to improve React app performance?",
  content: `### Question

I'm looking for tips and best practices to enhance the performance of a React application. I have a moderately complex app with multiple components, and I've noticed some performance bottlenecks. What should I focus on?

#### What I've Tried:
- Lazy loading components
- Using React.memo on some components
- Managing state with React Context API

#### Issues:
- The app still lags when rendering large lists.
- Switching between pages feels sluggish.
- Sometimes, re-renders happen unexpectedly.

#### Key Areas I Need Help With:
1. Efficiently handling large datasets.
2. Reducing unnecessary re-renders.
3. Optimizing state management.

Here is a snippet of my code that renders a large list. Maybe I'm doing something wrong here:

\`\`\`js
import React, { useState, useMemo } from "react";

const LargeList = ({ items }) => {
  const [filter, setFilter] = useState("");

  // Filtering items dynamically
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items"
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default LargeList;
\`\`\`

#### Questions:
1. Is using \`useMemo\` the right approach here, or is there a better alternative?
2. Should I implement virtualization for the list? If yes, which library would you recommend?
3. Are there better ways to optimize state changes when dealing with user input and dynamic data?

Looking forward to your suggestions and examples!

**Tags:** React, Performance, State Management
  `,
  createdAt: "2025-01-15T12:34:56.789Z",
  upvotes: 42,
  downvotes: 3,
  views: 1234,
  answers: 5,
  tags: [
    { _id: "tag1", name: "React" },
    { _id: "tag2", name: "Node" },
    { _id: "tag3", name: "PostgreSQL" },
  ],
  author: {
    _id: "u456",
    name: "Jane Doe",
    image: "/avatars/jane-doe.png",
  },
};

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const { author, title, createdAt, answers, views, tags, content } =
    sampleQuestion;
  return (
    <>
      <div className="flex-col flex-start w-full">
        <div className="flex flex-col-reverse justify-between w-full">
          <div className="flex justify-start items-center gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              fallbackAvatarClassName="text-[12px]"
              className="size-[24px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="text-dark300_light700 paragraph-semibold">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">votes</div>
        </div>

        <h2 className="mt-3.5 w-full text-dark200_light900 h2-semibold">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-5 mt-5 mb-8">
        <Metric
          imgUrl="/icons/clock.svg"
          value={`Asked ${getTimeStamp(new Date(createdAt))}`}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
        <Metric
          imgUrl="/icons/message.svg"
          value={answers}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          value={formatNumber(views)}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
      </div>
      <Preview content={content} />

      <div className="flex flex-wrap gap-2 mt-8">
        {tags.map((tag) => (
          <TagCard key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
    </>
  );
};

export default QuestionDetails;
