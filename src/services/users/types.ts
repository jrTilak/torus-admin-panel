export type HandleGetUsersServiceProps = Partial<{
  limit: number;
  page: number;
  search: {
    query: string;
    by: "name" | "email" | "country";
  };
  sort: {
    by: "name" | "email" | "country" | "createdAt" | "status";
    order: "asc" | "desc";
  };
  status: "active" | "inactive";
  includeDeleted: boolean;
}>;

export type Pagination = {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
  hasNextPage: boolean;
  totalPages: number;
};

export type HandleGetUsersServiceReturn = {
  result: User[];
  pagination: Pagination;
};

export type User = {
  id: number;
  name: string;
  email: string;
  country: string;
  status: "active" | "inactive";
  createdAt: string;
  isDeleted: boolean;
  avatar: string;
};
