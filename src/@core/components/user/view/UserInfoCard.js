// ** React Imports
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

// ** Reactstrap Imports
import {
 
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useUserDetail } from "../../../../core/services/api/UserDetail";
import { EditUserForm } from "./EditUserModal/EditUserForm";

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

const UserInfoCard = () => {
  // ** State
  const [show, setShow] = useState(false);

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان لغو نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:"لغو",
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "غیر فعال شد",
          text: "عملیات با موفقیت انجام شد !",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: "عملیات با موفقیت لغو شد",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const { id } = useParams();


  const { data, isError, isLoading } = useUserDetail(id);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <div className="d-flex justify-content-between">
      <Card style={{ width: "300px" }}>
        <CardBody className="w-100">
          <div className="user-avatar-section  justify-content-center d-flex">
            <div className="d-flex   flex-column">
              {/* {renderUserImg()} */}
              <img
                height="210"
                width="210"
                alt="user-avatar"
                src={
                  data.currentPictureAddress !== null &&
                  data.currentPictureAddress !== "Not-set"
                    ? data.currentPictureAddress
                    : Logo
                }
                className=" rounded  mb-2"
              />
              <div className="user-avatar-section"></div>
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <Badge>
                    <span className="fs-3">{data.fName} </span>
                    <span className="fs-3">{data.lName}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.courses.length}</h4>
                <small>دوره ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.coursesReseves.length}</h4>
                <small>دوره رزروشده</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {/* {selectedUser !== null ? ( */}
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">ایمیل:</span>
                <span>{data.gmail}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">شماره تماس:</span>
                <Badge
                  className="text-capitalize"
                  color={statusColors[data.phoneNumber]}
                >
                  {data.phoneNumber}
                </Badge>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">درصد تکمیل پروفایل :</span>
                <span>{data.profileCompletionPercentage}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">کدملی:</span>
                <span>{data.nationalCode}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">آدرس:</span>
                <span>{data.homeAdderess}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">بیوگرافی:</span>
                <span>{data.userAbout}</span>
              </li>
            </ul>
            {/* ) : null} */}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              غیرفعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <EditUserForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserInfoCard;
