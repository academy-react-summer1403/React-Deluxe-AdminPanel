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
} from "react-feather";

import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useUserComment } from "../../../../core/services/api/UserComment";
import { useAcceptComment } from "../../../../core/services/api/AcceptComment";
import toast from "react-hot-toast";

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

  const mutation = useAcceptComment();

  const handleAccept = async (commentId) => {
    const userToast = toast.loading("درحال تایید کامنت");
    try {
      await mutation.mutateAsync(commentId);
      toast.success("تایید کامنت با موفقیت شد!", { id: userToast });
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
                    style={{ width: "35px", textAlign: "center" }}
                  >
                    تایید شده
                  </Badge>
                ) : (
                  <Badge
                    color="light-danger"
                    className="fs-5"
                    style={{ width: "70px", textAlign: "center" }}
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
        <div className="column-action d-flex">
          <div
            className="btn btn-sm"
            onClick={() => handleAccept(row.commentId)}
          >
            <FileText
              className="cursor-pointer"
              size={17}
              id={`send-tooltip-${row.id}`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`send-tooltip-${row.id}`}
              // className="mb-1"
            >
              جزییات دوره <FileText />
            </UncontrolledTooltip>
          </div>
          <div
            className="btn btn-sm"
            // onClick={() => handleDelete(row)}
          >
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف دوره
            </UncontrolledTooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
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
