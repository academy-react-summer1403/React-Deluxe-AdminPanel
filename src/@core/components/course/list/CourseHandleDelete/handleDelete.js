import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteCourse } from "../../../../../core/services/api/DeleteCourse";

export const usehandleDelete = () => {
  //   console.log(row);
  const MySwal = withReactContent(Swal);
  const mutation = useDeleteCourse();

  const handleDelete = async (row) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
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
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
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
