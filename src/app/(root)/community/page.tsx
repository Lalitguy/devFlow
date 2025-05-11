import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users } = data || {};
  return (
    <div>
      <h1 className="text-dark100_light900 h1-bold">All Users</h1>
      <div className="mt-11">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          placeholder="Search for devs..."
        />
      </div>

      <DataRenderer
        success={success}
        data={users}
        empty={EMPTY_USERS}
        render={(users) => (
          <div className="flex flex-wrap gap-5 mt-12">
            {users.map((user) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Community;
