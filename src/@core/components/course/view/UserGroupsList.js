// ** Reactstrap Imports
import { Card, CardHeader, Progress, UncontrolledTooltip } from "reactstrap";

// ** Third Party Components
import { ChevronDown, FileText, Trash2 } from "react-feather";
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
import { useCourseGroups } from "../../../../core/services/api/CourseGroups";

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

const UserGroupsList = () => {
  const columns = [
    {
      minWidth: "130px",
      name: "نام گروه",
      selector: (row) => row.groupName,
      center: true,
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
      name: "ظرفیت گروه",
      selector: (row) => row.groupCapacity,
      center: true,
    },
    {
      name: "ظرفیت دوره",
      selector: (row) => row.courseCapacity,
      center: true,
    },
    {
      name: "شماره گروه",
      selector: (row) => row.groupId,
      center: true,
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
      name: "اقدامات",
      selector: (row) => row.groupId,
      center: true,
      cell: (row) => {
        return (
          <div className="column-action d-flex">
            <Link
              className="user_name text-truncate text-body p-0"
              to={`/courseDetail/${row?.courseId}`}
            >
              <div className="btn btn-sm">
                <FileText
                  className="cursor-pointer "
                  size={17}
                  id={`send-tooltip-${row.id}`}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`send-tooltip-${row.id}`}
                  // className="mb-1"
                >
                  جزییات دوره
                </UncontrolledTooltip>
              </div>
            </Link>
            <div className="btn btn-sm" onClick={() => handleDelete(row)}>
              <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
              <UncontrolledTooltip
                placement="top"
                target={`pw-tooltip-${row.id}`}
              >
                حذف دوره
              </UncontrolledTooltip>
            </div>
            {/* <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => {
                //   e.preventDefault()
                //   store.dispatch(deleteUser(row.id))
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          </div>
        );
      },
    },
  ];

  const { id } = useParams();

  const { data: data2 } = useQuery({
    queryKey: ["userdetail"],
  });
  console.log(data2);

  const { data } = useCourseGroups(id, data2.teacherId);

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

export default UserGroupsList;
