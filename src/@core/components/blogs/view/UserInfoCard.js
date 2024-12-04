// ** React Imports
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, Eye, MessageSquare } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useGetBlogDetails } from "../../../../core/services/api/GetBlogDetail";
import { DatePersianizer } from "./../../../../utility/utils/DatePersianizer";
import { EditBlogForm } from "./EditBlogForm/EditBlogForm";
import Logo from "@src/assets/images/logo/reactdeluxe.png";
import { useActiveDeactiveBlog } from "../../../../core/services/api/ActiveDeactiveBlogs";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedUser.username,
      // lastName: selectedUser.fullName.split(' ')[1],
      // firstName: selectedUser.fullName.split(' ')[0]
    },
  });

  const { id } = useParams();

  const { data } = useGetBlogDetails(id);

  const mutationActivation = useActiveDeactiveBlog();

  const queryClient = useQueryClient();

  const handleActication = async (row) => {
    const formData = new FormData();
    formData.append("Active", !data?.detailsNewsDto.active);
    formData.append("Id", row?.detailsNewsDto.id);
    console.log(row);
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          await mutationActivation.mutateAsync(formData);
          MySwal.fire({
            icon: "success",
            title: row?.isActive ? "غیرفعال سازی" : "فعال سازی",
            text: "عملیات با موفقیت انجام شد",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          queryClient.invalidateQueries("GetBlogDetails");
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "حذف نشد !",
            text: "عملیات با موفقیت انجام نشد",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
        // MySwal.fire({
        //   icon: "success",
        //   title: "حذف شد !",
        //   text: "عملیات با موفقیت انجام شد",
        //   customClass: {
        //     confirmButton: "btn btn-success",
        //   },
        // });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "عملیات لغو شد!",
          text: "لغو",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <div style={{ width: "25%" }}>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <Avatar
                img={
                  data?.detailsNewsDto.currentImageAddress !== null &&
                  data?.detailsNewsDto.currentImageAddress !== "Not-set" &&
                  data?.detailsNewsDto.currentImageAddress.includes("http")
                    ? data?.detailsNewsDto.currentImageAddress
                    : Logo
                }
                imgHeight={150}
                imgWidth={150}
              />
              <div className="d-flex flex-column align-items-center text-center mt-2">
                <div className="user-info">
                  <h4 className=" fs-3 fw-bolder">
                    {data?.detailsNewsDto.title}
                  </h4>
                  {data?.detailsNewsDto.active ? (
                    <Badge
                      color="light-success"
                      className="fs-5"
                      style={{ width: "auto", textAlign: "center" }}
                    >
                      فعال
                    </Badge>
                  ) : (
                    <Badge
                      color="light-danger"
                      className="fs-5"
                      style={{ width: "auto", textAlign: "center" }}
                    >
                      غیر فعال
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.currentView}</h4>
                <small>بازدیدها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.commentsCount}</h4>
                <small>کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {/* {selectedUser !== null ? ( */}
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">نام نویسنده:</span>
                <span>{data?.detailsNewsDto.addUserFullName}</span>
                {/* <span>{data.googleTitle}</span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">دسته بندی :</span>
                <span>{data?.detailsNewsDto.newsCatregoryName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان کوتاه:</span>
                {/* <Badge className='text-capitalize'  */}
                {/* color={statusColors[selectedUser.status]} */}
                {/* > */}
                {/* {selectedUser.status} */}
                {/* </Badge> */}
                <span>{data?.detailsNewsDto.miniDescribe}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان گوگل:</span>
                {/* <span className='text-capitalize'> */}
                <span>{data?.detailsNewsDto.googleTitle}</span>
                {/* </span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> تاریخ ایجاد:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.insertDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ بروزرسانی:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.updateDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">توضیحات دوره:</span>
                <span>{data?.detailsNewsDto.describe}</span>
              </li>
            </ul>
            {/* ) : null} */}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            {data?.detailsNewsDto.active ? (
              <Button
                className="ms-1"
                color="danger"
                outline
                onClick={() => handleActication(data)}
              >
                غیرفعال کردن
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="success"
                outline
                onClick={() => handleActication(data)}
              >
                فعال کردن
              </Button>
            )}
            {/* <Button
              className="ms-1"
              color="danger"
              outline
              onClick={() => handleActication(data)}
            >
              غیرفعال کردن
            </Button> */}
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <EditBlogForm data={data} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserInfoCard;
