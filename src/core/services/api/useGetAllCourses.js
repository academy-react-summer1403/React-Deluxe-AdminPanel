import { useQuery } from "@tanstack/react-query";

const GetAllCourses = async ({
  currentPage,
  rowsPerPage,
  debouncedSearchQuery,
  SortingCol,
  SortType,
}) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: debouncedSearchQuery ? debouncedSearchQuery : undefined,
    SortingCol: SortType ? SortType : undefined,
    SortType: SortingCol ? SortingCol : undefined,
    // Query: searchTerm ? searchTerm : undefined,
  };
  try {
    const response = await http.get(ApiRoutes.PANEL_GET_ALL_COURSES_ADMIN_URL, {
      params: AllParams,
    });
    return response;
  } catch (error) {
    console.log("This error For Get GetAllCourses in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllCourses = ({
  currentPage,
  rowsPerPage,
  debouncedSearchQuery,
  SortingCol,
  SortType,
}) => {
  return useQuery({
    queryKey: [
      "GetAllCourses",
      currentPage,
      rowsPerPage,
      debouncedSearchQuery,
      SortingCol,
      SortType,
    ],
    queryFn: () => {
      return GetAllCourses({
        currentPage,
        rowsPerPage,
        debouncedSearchQuery,
        SortingCol,
        SortType,
      });
    },
  });
};