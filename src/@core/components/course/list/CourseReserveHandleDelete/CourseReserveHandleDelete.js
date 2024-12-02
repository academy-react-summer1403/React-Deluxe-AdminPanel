import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteCourse } from "../../../../../core/services/api/DeleteCourse";
import { useDeleteUser } from "../../../../../core/services/api/DeleteUser";
import { useDeleteCourseReserve } from "../../../../../core/services/api/DeleteCourseReserve";

export const useCourseReserveHandleDelete = () => {
  //   console.log(row);
  const MySwal = withReactContent(Swal);
  const mutation = useDeleteCourseReserve();

  const CourseReserveHandleDelete = async (Id) => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "رزرو دوره برای همیشه حذف خواهد شد!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          await mutation.mutateAsync({
            id: Id,
          });
          MySwal.fire({
            icon: "success",
            title: "حذف شد !",
            text: "عملیات با موفقیت انجام شد",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "حذف نشد!",
            text: error.response.data.ErrorMessage
              ? `${error.response.data.ErrorMessage}`
              : "عملیات حذف با خطای تعریف نشده مواجه شد",
            customClass: {
              confirmButton: "btn btn-success",
            },
            confirmButtonText: "باشه",
          });
        }
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
          confirmButtonText: "باشه",
        });
      }
    });
  };
  return CourseReserveHandleDelete;
};
