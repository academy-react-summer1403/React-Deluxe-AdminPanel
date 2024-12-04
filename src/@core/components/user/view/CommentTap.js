// ** React Imports
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Third Party Components
import * as yup from "yup";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  Edit,
  Trash,
  Settings,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  FileText,
  Trash2,
  EyeOff,
  Eye,
} from "react-feather";

import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useUserComment } from "../../../../core/services/api/UserComment";
import { useAcceptComment } from "../../../../core/services/api/AcceptComment";
import toast from "react-hot-toast";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Delete01Icon,
} from "hugeicons-react";
import { useDeleteComment } from "../../../../core/services/api/DeleteComment";
import { useDeleteCommentModal } from "./DeleteCommentModal/DeleteCommentModal";
import { useRejectComment } from "../../../../core/services/api/RejectComment";
import { ReplyModal } from "../../course/view/ReplyModal/ReplyModal";

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const recentDevicesArr = [
  {
    device: "Dell XPS 15",
    location: "United States",
    browser: "Chrome on Windows",
    activity: "10, Jan 2021 20:07",
  },
  {
    location: "Ghana",
    device: "Google Pixel 3a",
    browser: "Chrome on Android",
    activity: "11, Jan 2021 10:16",
  },
  {
    location: "Mayotte",
    device: "Apple iMac",
    browser: "Chrome on MacOS",
    activity: "11, Jan 2021 12:10",
  },
  {
    location: "Mauritania",
    device: "Apple iPhone XR",
    browser: "Chrome on iPhone",
    activity: "12, Jan 2021 8:29",
  },
];

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const CommentTap = () => {
  // ** Hooks
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState("authApp");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    trigger();
    console.log(data);
  };
  const handleContinue = () => {
    setShow(false);
    setShowDetailModal(true);
  };

  const { id } = useParams();
  // getQuery("userCourses", `/Course/CommentManagment?userId=${id}`);
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["userCourses"],
  // });
  const { data, isError, isLoading } = useUserComment(id);

  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const mutation = useAcceptComment();

  const handleAccept = async (commentId) => {
    const userToast = toast.loading("درحال تایید کامنت");
    try {
      await mutation.mutateAsync(commentId);
      toast.success("تایید کامنت با موفقیت شد!", { id: userToast });
      queryClient.invalidateQueries("UserComment");
    } catch (error) {
      toast.error(
        `تایید کامنت با مشکل مواجه شد:,
        ${
          error.response.data.ErrorMessage
            ? error.response.data.ErrorMessage
            : "خطای تعریف نشده"
        }`,
        { id: userToast }
      );
      console.log(error);
    }
  };

  const rejectMutation = useRejectComment();

  const handleReject = async (commentId) => {
    const userToast = toast.loading("درحال رد کردن کامنت");
    try {
      await rejectMutation.mutateAsync(commentId);
      toast.success("رد کردن کامنت با موفقیت شد!", { id: userToast });
      queryClient.invalidateQueries("UserComment");
    } catch (error) {
      toast.error(
        `رد کردن کامنت با مشکل مواجه شد:,
        ${
          error.response.data.ErrorMessage
            ? error.response.data.ErrorMessage
            : "خطای تعریف نشده"
        }`,
        { id: userToast }
      );
      console.log(error);
    }
  };

  // const deleteMutation = useDeleteComment()

  const handleDelete = useDeleteCommentModal();

  // const handleDelete = async (commentId) => {
  //   const userToast = toast.loading("درحال تایید کامنت");
  //   try {
  //     await deleteMutation.mutateAsync(commentId);
  //     toast.success("تایید کامنت با موفقیت شد!", { id: userToast });
  //   } catch (error) {
  //     toast.error(
  //       `تایید کامنت با مشکل مواجه شد:,
  //       ${
  //         error.response.data.ErrorMessage
  //           ? error.response.data.ErrorMessage
  //           : "خطای تعریف نشده"
  //       }`,
  //       { id: userToast }
  //     );
  //     console.log(error);
  //   }
  // };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  const columns = [
    {
      minWidth: "130px",
      center: true,
      name: "نام دوره",
      selector: (row) => row.courseTitle,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseTitle}</span>
            </div>
          </div>
        );
      },
    },
    {
      minWidth: "130px",
      center: true,
      name: "عنوان کامنت",
      selector: (row) => row.commentTitle,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate-1 w-1 fw-bolder">
                {row.commentTitle}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      center: true,
      minWidth: "130px",
      name: "متن کامنت",
      selector: (row) => row.describe,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate-1 w-1 fw-bolder">
                {row.describe}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      center: true,
      minWidth: "130px",
      name: "وضعیت",
      selector: (row) => row.accept,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                {row.accept ? (
                  <Badge
                    color="light-success"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    تایید شده
                  </Badge>
                ) : (
                  <Badge
                    color="light-danger"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    تایید نشده
                  </Badge>
                )}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      center: true,
      cell: (row) => (
        // <div className="column-action d-flex">
        //   {!row.accept && (
        //     <div
        //       className="btn btn-sm"
        //       onClick={() => handleAccept(row.commentId)}
        //     >
        //       <CheckmarkCircle02Icon
        //         color={"#00cf13"}
        //         size={20}
        //         id={"AcceptComment"}
        //       />
        //       <UncontrolledTooltip
        //         placement="top"
        //         target={`AcceptComment`}
        //         // className="mb-1"
        //       >
        //         تایید
        //       </UncontrolledTooltip>
        //     </div>
        //   )}
        //   <div
        //     className="btn btn-sm"
        //     onClick={() => handleDelete(row.commentId)}
        //   >
        //     <CancelCircleIcon
        //       color={"#ff0000"}
        //       size={20}
        //       id={"CancelComment"}
        //     />
        //     <UncontrolledTooltip placement="top" target={`CancelComment`}>
        //       حذف
        //     </UncontrolledTooltip>
        //   </div>
        // </div>
        <div className="column-action d-flex">
          <div className="btn btn-sm">
            {row.replyCount > 0 ? (
              <div onClick={() => toggleModal(row.commentId)}>
                <Eye size={17} id={`eye-tooltip-${row.commentId}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.commentId}`}
                >
                  مشاهده پاسخ
                </UncontrolledTooltip>
              </div>
            ) : (
              <>
                <EyeOff size={17} id={`eye-tooltip-${row.commentId}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.commentId}`}
                >
                  پاسخی نیست
                </UncontrolledTooltip>
              </>
            )}
          </div>

          <div className="column-action d-flex">
            {!row.accept ? (
              <div className="btn btn-sm" onClick={() => handleAccept(row.commentId)}>
                <CheckmarkCircle02Icon
                  color={"#00cf13"}
                  size={20}
                  id={"AcceptComments"}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`AcceptComments`}
                  // className="mb-1"
                >
                  تایید
                </UncontrolledTooltip>
              </div>
            ) : (
              <div className="btn btn-sm" onClick={() => handleReject(row.commentId)}>
                <CancelCircleIcon
                  color={"#ffc300"}
                  size={20}
                  id={"RejectComment"}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`RejectComment`}
                  // className="mb-1"
                >
                  رد کردن
                </UncontrolledTooltip>
              </div>
            )}

            <div className="btn btn-sm" onClick={() => handleDelete(row.commentId)}>
              <Delete01Icon color={"#ff0000"} size={18} id={"CancelComment"} />
              <UncontrolledTooltip placement="top" target={`CancelComment`}>
                حذف
              </UncontrolledTooltip>
            </div>
          </div>

          <Modal
            isOpen={openModalId === row.commentId}
            toggle={() => toggleModal(row.commentId)}
            className="modal-dialog-centered modal-xl"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => toggleModal(row.commentId)}
            >
              <div className="mb-2">
                <h1 className="mb-1">
                  <span className="fs-5">پاسخ ها به کامنت</span> {row.title}
                </h1>
              </div>
            </ModalHeader>
            {openModalId === row.commentId && (
              <ReplyModal
                // toggleModal={(value) => toggleModal(value)}
                // data={data}
                // replyColumns={replyColumns}
                rowId={row.commentId}
                courseId={row.courseId}
                // openModalId={openModalId}
              />
            )}
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data?.comments}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CommentTap;
