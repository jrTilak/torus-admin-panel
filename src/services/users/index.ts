import users from "@/db/users.json";

import {
  HandleGetUsersServiceProps,
  HandleGetUsersServiceReturn,
  User
} from "./types";

export const handleGetUsersService = async (
  queries: HandleGetUsersServiceProps = {}
): Promise<HandleGetUsersServiceReturn> => {
  const {
    includeDeleted = true,
    limit = 5,
    page = 1,
    sort = { by: "createdAt", order: "desc" },
    search = {
      by: "name",
      query: ""
    },
    status
  } = queries;

  const total = users.length;
  const offset = (page - 1) * limit;

  const filteredUsers = users
    .filter((user) => {
      if (!includeDeleted && user.isDeleted) {
        return false;
      }

      if (status && user.status !== status) {
        return false;
      }

      if (search.query) {
        return user[search.by]
          ?.toLowerCase()
          .includes(search.query?.toLowerCase());
      }

      return true;
    })
    .sort((a, b) => {
      if (sort.order === "asc") {
        return a[sort.by] > b[sort.by] ? 1 : -1;
      }

      return a[sort.by] < b[sort.by] ? 1 : -1;
    });

  const paginatedUsers = filteredUsers.slice(offset, offset + limit) as User[];

  return {
    result: paginatedUsers,
    pagination: {
      total,
      limit,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
      totalPage: Math.ceil(filteredUsers.length / limit),
      hasNextPage: offset + limit < filteredUsers.length
    }
  };
};
