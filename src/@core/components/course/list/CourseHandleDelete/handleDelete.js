import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteCourse } from "../../../../../core/services/api/DeleteCourse";

export const usehandleDelete = () => {
  //   console.log(row);
  const MySwal = withReactContent(Swal);
  const mutation = useDeleteCourse();

  const handleDelete = async (row) => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:"لغو",
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
            CourseId: row.courseId,
            isActive: row.isActive,
          });
        } catch (error) {
          console.log(error);
        }
        MySwal.fire({
          icon: "success",
          title: "حذف شد !",
          text: "عملیات با موفقیت انجام شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  return handleDelete;
};
