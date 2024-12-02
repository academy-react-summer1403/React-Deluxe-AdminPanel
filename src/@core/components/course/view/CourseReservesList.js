// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
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
import { useParams } from "react-router-dom";
import { useCourseUser } from "../../../../core/services/api/CourseUser";
import { Badge } from "reactstrap";
import { useCourseReserveWithCourseId } from "../../../../core/services/api/CourseReserveWithCourseId";
import { DatePersianizer } from "./../../../../utility/utils/DatePersianizer";

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
  ];

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
