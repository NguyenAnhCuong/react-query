import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const PAGE_SIZE = 4;

export const useFetchUser = (currentPage: number) => {
  const queryInfo = useQuery({
    queryKey: QUERY_KEY.getUserPaginate(currentPage),
    queryFn: async (): Promise<any> => {
      const res = await fetch(
        `http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`
      );
      const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
      const page_size = PAGE_SIZE;
      const total_pages =
        total_items === 0 ? 0 : Math.ceil(total_items / page_size);
      const d = await res.json();
      return {
        total_items,
        total_pages,
        users: d,
      };
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryInfo,
    data: queryInfo?.data?.users ?? [],
    count: queryInfo?.data?.total_items ?? 0,
    totalPages: queryInfo?.data?.total_pages ?? 0,
  };
};
