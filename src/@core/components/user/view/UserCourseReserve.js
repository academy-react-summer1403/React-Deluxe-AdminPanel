// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import { ChevronDown, FileText, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useCourseReserveHandleDelete } from "../../course/list/CourseReserveHandleDelete/CourseReserveHandleDelete";
import { CancelCircleIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { useState } from "react";
import { selectThemeColors } from "../../../../utility/Utils";
import Select from "react-select";
import { useCourseGroupsAll } from "../../../../core/services/api/CourseGroupsAll";
import { useAcceptCourseReserve } from "../../../../core/services/api/AcceptCourseReserve";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ReserveGroupForm } from "./ReserveGroupForm/ReserveGroupForm";

const UserCourseReserve = (data) => {
  const columns = [
    {
      sortable: true,
      minWidth: "130px",
      name: "نام دوره",
      selector: (row) => row.courseName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: " تاریخ رزرو دوره",
      selector: (row) => row.reserverDate.slice(0, 10),
    },
    {
      name: "وضعیت دوره ",
      selector: (row) => row.accept,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span
                className="text-truncate fw-bolder"
                style={{ width: "250px" }}
              >
                {row.accept ? (
                  <Badge
                    color="light-success"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    رزرو شده
                  </Badge>
                ) : (
                  <Badge
                    color="light-danger"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    رزرو نشده
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
          <Link to={`/courseDetail/${row.courseId}`}>
            <div className="btn btn-sm">
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
                جزییات رزرو دوره
              </UncontrolledTooltip>
            </div>
          </Link>
          {!row?.accept && (
            <>
              <div
                className="btn btn-sm"
                onClick={() => toggleModal(row?.reserveId)}
              >
                <CheckmarkCircle02Icon
                  color={"#00cf13"}
                  size={20}
                  id={"Accept"}
                />
                <UncontrolledTooltip placement="top" target={"Accept"}>
                  تایید رزرو دوره
                </UncontrolledTooltip>
              </div>
              <div
                className="btn btn-sm"
                onClick={() => handleDelete(row?.reserveId)}
              >
                <CancelCircleIcon color={"#ff0000"} size={20} id={"Cancel"} />
                <UncontrolledTooltip placement="top" target={"Cancel"}>
                  حذف رزرو دوره
                </UncontrolledTooltip>
              </div>
              <Modal
                isOpen={openModalId === row?.reserveId}
                toggle={() => toggleModal(row?.reserveId)}
                className="modal-dialog-centered modal-lg"
              >
                <ModalHeader
                  className="bg-transparent text-center"
                  toggle={() => toggleModal(row?.reserveId)}
                >
                  گروه دوره را انتخاب کنید!
                </ModalHeader>
                <ModalBody className="px-sm-5 pt-50 pb-5">
                  {openModalId === row?.reserveId && (
                    <ReserveGroupForm
                      row={row}
                      setGroupId={setGroupId}
                      groupId={groupId}
                    />
                  )}
                </ModalBody>
              </Modal>
            </>
          )}
        </div>
      ),
    },
  ];
  const [groupId, setGroupId] = useState();
  console.log(groupId);
  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = useCourseReserveHandleDelete();
  console.log(data);

  const { data: data2 } = useCourseGroupsAll();

  console.log(data2);

  const mutate = useAcceptCourseReserve();

  //   e.preventDefault();
  //   console.log(studentId, courseId);
  //   const courseToast = toast.loading("درحال تبدیل رزرو به دوره");
  //   try {
  //     await mutate.mutateAsync({
  //       studentId,
  //       courseId,
  //       courseGroupId: groupId.value,
  //     });
  //     toast.success("دوره با موفقیت اضافه شد!", { id: courseToast });
  //   } catch (error) {
  //     toast.error(
  //       `تبدیل رزرو با خطا مواجه شد
  //     ${
  //       error.response.data.title
  //         ? error.response.data.title
  //         : error.response.data.ErrorMessage
  //     }`,
  //       { id: courseToast }
  //     );
  //   }
  // };

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.data.coursesReseves}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserCourseReserve;
