import { useQuery } from "@tanstack/react-query";
import { FullPageLoading } from "../../../../Components/Common/Loading/FullPageLoading/FullPageLoading";

export const useQueryShortcut = (queryKey, variable) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: variable ? [queryKey, variable] : [queryKey],
  });

  if (isError) <div>"Fetching Failed¯\_(ツ)_/¯"</div>;
  if (isLoading) <FullPageLoading />;

  return data;
};
