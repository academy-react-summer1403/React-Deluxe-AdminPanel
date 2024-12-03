// ** React Imports
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

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
import { Check, Briefcase, X, Users, Bookmark } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { getQuery } from "../../../../../core/services/api/ReactQuery/getQuery";
import { Mutation, QueryClient, useQuery } from "@tanstack/react-query";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
// import { EditModal } from "./EditModal";
import { DatePersianizer } from "./../../../../../utility/utils/DatePersianizer";
import { useDeleteCourse } from "../../../../../core/services/api/DeleteCourse";
import { usehandleDelete } from "../../list/CourseHandleDelete/handleDelete";
import { useActiveDeactiveCourse } from "../../../../../core/services/api/ActiveDeactiveCourse";
import toast from "react-hot-toast";
import { EditCourseForm } from "./../EditCourseModal/EditCourseForm";
import { useCourseDetailStudent } from "../../../../../core/services/api/CourseDetailStudent";
import { GetCreateCourse } from "../../../../../core/services/api/GetCreateCourse";

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

// const MySwal = withReactContent(Swal);

// ** render user img
//  const renderUserImg = () => {
//   if (selectedUser !== null && selectedUser.avatar.length) {
//     return (
//       <img
//         height='110'
//         width='110'
//         alt='user-avatar'
//         src={selectedUser.avatar}
//         className='img-fluid rounded mt-3 mb-2'
//       />
//     )
//   } else {
//     return (
//       <Avatar
//         initials
//         color={selectedUser.avatarColor || 'light-primary'}
//         className='rounded mt-3 mb-2'
//         content={selectedUser.fullName}
//         contentStyles={{
//           borderRadius: 0,
//           fontSize: 'calc(48px)',
//           width: '100%',
//           height: '100%'
//         }}
//         style={{
//           height: '110px',
//           width: '110px'
//         }}
//       />
//     )
//   }
// }
const CourseGroupInfoCard = () => {
  // ** State
  const [show, setShow] = useState(false);

  // const mutation = useDeleteCourse();

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert user!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, Suspend user!",
  //     customClass: {
  //       confirmButton: "btn btn-primary",
  //       cancelButton: "btn btn-outline-danger ms-1",
  //     },
  //     buttonsStyling: false,
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: "success",
  //         title: "Suspended!",
  //         text: "User has been suspended.",
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: "Cancelled",
  //         text: "Cancelled Suspension :)",
  //         icon: "error",
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //     }
  //   });
  // };
  const handleDelete = usehandleDelete();

  const mutation = useActiveDeactiveCourse();

  const handleActiveDeactive = async () => {
    const queryClient = new QueryClient();
    try {
      await mutation.mutateAsync(data);
      toast.success("hsduifhhfh");
      queryClient.invalidateQueries("userdetail");
      // queryClient.fetchQuery(["userdetail"]);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  getQuery("userdetail", `/Course/${id}`);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["userdetail"],
  });

  const { data: data2 } = useCourseDetailStudent(data?.courseId);
  console.log("data2", data2);

  const { data: data3 } = GetCreateCourse();
  console.log("data3", data3);

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
                  data.imageAddress !== null && data.imageAddress !== "Not-set"
                    ? data.imageAddress
                    : Logo
                }
                className=" rounded  mb-2"
              />
              <div className="user-avatar-section">
                {/* <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div> */}
              </div>
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  {/* {selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'} */}

                  {/* {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="text-center fw-bolder fs-3">
                  {" "}
                  {data.title}
                </span>
                {data?.isActive ? (
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
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Users className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.courseUserTotal}</h4>
                <small>کاربر ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Bookmark className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.reserveUserTotal}</h4>
                <small>رزرو ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {/* {selectedUser !== null ? ( */}
            <ul className="list-unstyled">
              {/* <li className="mb-75">
                <span className="fw-bolder me-25">نام دوره:</span>
                <span> {data.title}</span>
              </li> */}

              <li className="mb-75">
                <span className="fw-bolder me-25">نام استاد:</span>
                <span> {data.teacherName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">نام کلاس:</span>
                {/* <Badge
                  className="text-capitalize"
                  color={statusColors[data.phoneNumber]}
                > */}
                <span> {data.courseClassRoomName}</span>

                {/* </Badge> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">سطح دوره :</span>
                <span> {data.courseLevelName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">وضعیت دوره :</span>
                <span>{data.courseStatusName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نوع دوره:</span>
                <span> {data.courseTypeName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">قیمت دوره:</span>
                <span> {data.cost} تومان</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">شروع دوره:</span>
                <span> {DatePersianizer(data.startTime)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">پایان دوره:</span>
                <span> {DatePersianizer(data.endTime)}</span>
              </li>
              {/* <li className="mb-75">
                <span className="fw-bolder me-25"> توضیحات:</span>
                <span className="text-capitalize">{data.describe}</span>
              </li> */}
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
              onClick={() => handleActiveDeactive(data)}
            >
              غیرفعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* <EditModal /> */}
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <EditCourseForm data2={data2} data3={data3} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CourseGroupInfoCard;
