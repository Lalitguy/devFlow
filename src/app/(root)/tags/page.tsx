import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const Tags = async () => {
  const { success, data } = await getTags({
    page: 1,
    pageSize: 10,
  });
  if (!success) return;
  const { tags } = data || {};

  console.log(JSON.stringify(tags, null, 2));
  return <div>{JSON.stringify(tags, null, 2)}</div>;
};

export default Tags;
