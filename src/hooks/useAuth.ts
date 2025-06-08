import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthApi";

export const useAuth = () => {
  const { data, isLoading, isError, isFetching, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return { data, isLoading, isError, isFetching, isPending, error };
};
