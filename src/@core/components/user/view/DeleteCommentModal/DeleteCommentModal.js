import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteComment } from "../../../../../core/services/api/DeleteComment";

export const useDeleteCommentModal = () => {
  //   console.log(row);
  const MySwal = withReactContent(Swal);
  const mutation = useDeleteComment();

  const DeleteCommentModal = async (commentId) => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "بعد از حذف کامنت امکان بازگشت وجود ندارد!",
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
          await mutation.mutateAsync({ commentId });
          MySwal.fire({
            icon: "success",
            title: "حذف شد !",
            text: "عملیات با موفقیت انجام شد",
            customClass: {
              confirmButton: "btn btn-success",
            },
            confirmButtonText: "ایول",
          });
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "حذف نشد!",
            text: `:عملیات حذف با خطا مواجه شد
            ${error.response.data.ErrorMessage}
            `,
            customClass: {
              confirmButton: "btn btn-success",
            },
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
  return DeleteCommentModal;
};
