// ** Reactstrap Imports
import { Card, CardHeader, Modal, ModalBody, ModalHeader, Progress, UncontrolledTooltip } from "reactstrap";

// ** Third Party Components
import { ChevronDown, FileText } from "react-feather";
import DataTable from "react-data-table-component";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useCourseUser } from "../../../../core/services/api/CourseUser";
import { Badge } from "reactstrap";
import { useCourseReserveWithCourseId } from "../../../../core/services/api/CourseReserveWithCourseId";
import { DatePersianizer } from "./../../../../utility/utils/DatePersianizer";
import { useState } from "react";
import { CancelCircleIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { ReserveGroupForm } from "../../user/view/ReserveGroupForm/ReserveGroupForm";
import { useCourseReserveHandleDelete } from "../list/CourseReserveHandleDelete/CourseReserveHandleDelete";

// const projectsArr = [
//   {
//     progress: 60,
//     hours: "210:30h",
//     progressColor: "info",
//     totalTasks: "233/240",
//     // subtitle: 'React Project',
//     title: "BGC",
//     img: reactLabel,
//   },
//   {
//     hours: "89h",
//     progress: 15,
//     totalTasks: "9/50",
//     progressColor: "danger",
//     // subtitle: 'UI/UX Project',
//     title: "Falcon",
//     img: xdLabel,
//   },
//   {
//     progress: 90,
//     hours: "129:45h",
//     totalTasks: "100/190",
//     progressColor: "success",
//     // subtitle: 'Vuejs Project',
//     title: "Dashboard",
//     img: vueLabel,
//   },
//   {
//     hours: "45h",
//     progress: 49,
//     totalTasks: "12/86",
//     progressColor: "warning",
//     // subtitle: 'iPhone Project',
//     title: "Foodista",
//     img: sketchLabel,
//   },

//   {
//     progress: 73,
//     hours: "67:10h",
//     totalTasks: "234/378",
//     progressColor: "info",
//     // subtitle: 'React Project',
//     title: "Doj",
//     img: reactLabel,
//   },
//   {
//     progress: 81,
//     hours: "108:39h",
//     totalTasks: "264/537",
//     title: "HTML",
//     progressColor: "success",
//     // subtitle: 'Crypto Website',
//     img: htmlLabel,
//   },
//   {
//     progress: 78,
//     hours: "88:19h",
//     totalTasks: "214/627",
//     progressColor: "success",
//     // subtitle: 'Vuejs',
//     // title: 'Vue Admin template',
//     img: vueLabel,
//   },
// ];

const CourseReservesList = () => {
  const columns = [
    {
      sortable: true,
      minWidth: "130px",
      name: "نام دانشجو",
      selector: (row) => row.studentName,
      // cell: (row) => {
      //   return (
      //     <div className="d-flex justify-content-left align-items-center">
      //       <div className="avatar-wrapper">
      //         {/* <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' /> */}
      //       </div>
      //       <div className="d-flex flex-column">
      //         <span className="text-truncate fw-bolder">{row.title}</span>
      //       </div>
      //     </div>
      //   );
      // },
    },
    {
      name: "شماره دانشجو",
      selector: (row) => row.studentId,
      sortable: true,
      // cell: (row) => {
      //   return (
      //     <div className="d-flex justify-content-left align-items-center">
      //       <div className="avatar-wrapper">
      //         {/* <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' /> */}
      //       </div>
      //       <div className="d-flex flex-column">
      //         <span
      //           className="text-truncate fw-bolder"
      //           style={{ width: "250px" }}
      //         >
      //           {row.describe}
      //         </span>
      //       </div>
      //     </div>
      //   );
      // },
    },
    {
      name: "تاریخ رزرو",
      selector: (row) => DatePersianizer(row.reserverDate),
    },
    {
      name: "وضعیت رزرو",
      // selector: (row) => row.peymentDone,
      cell: (row) => {
        return row?.accept ? (
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
        );
      },
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex">
          <Link to={`/userDetail/${row.studentId}`}>
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
                جزییات دانشجو
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
                  className="bg-transparent text-center fs-8 mt-2" style={{marginRight:"330px"}}
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

  const { id } = useParams();

  const { data } = useCourseReserveWithCourseId(id);
  console.log(data);

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CourseReservesList;
