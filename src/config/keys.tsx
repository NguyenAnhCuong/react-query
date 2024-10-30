export const QUERY_KEY = {
  getUserPaginate: (page: number) => {
    return ["fetchUser", page];
  },
  getAllUser: () => ["fetchUser"],
};
