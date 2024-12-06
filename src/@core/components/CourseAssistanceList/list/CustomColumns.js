import Avatar from "@components/avatar";
// import default_image from "../../../images/default_image.png";
// import NoProfile from "../../../images/profile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Archive,
  Check,
  Database,
  Edit,
  Edit2,
  ExternalLink,
  MoreVertical,
  Settings,
  Slack,
  Trash2,
  User,
  X,
} from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// import { useActiveCourse } from "../../../core/services/api/Admin/handelreserve";
import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import EditCourseAssistance from "./modal/EditCourseAssistance";
import { useState } from "react";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "تاریخ ساخت",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.inserDate,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {
            row?.inserDate 
            // ? convertIsoToJalali(row?.inserDate) : ""
            }
          </h5>
        </>
      );
    },
  },

  {
    name: "عنوان دوره ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <>
          <NavLink
            to={`/CourseListPage/${row?.courseId}`}
            className="text-truncate text-capitalize align-middle"
          >
            {row.courseName}
          </NavLink>
        </>
      );
    },
  },

  {
    name: " assistanceName ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.assistanceName,
    cell: (row) => {
      return (
        <>
          <NavLink
            to={`/UsersPage/${row?.userId}`}
            className="text-truncate text-capitalize align-middle"
          >
            {row.assistanceName}
          </NavLink>
        </>
      );
    },
  },
  {
    name: "اقدامات",
    minWidth: "100px",

    cell: (row) => {
      const queryClient = useQueryClient();
      const navigate = useNavigate();
      const [show, setShow] = useState(false);

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  navigate(`/CourseListPage/${row.courseId}`);
                }}
              >
                <ExternalLink size={14} className="me-50" />
                <span className="align-middle">جزییات دوره</span>
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => setShow(!show)}>
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <EditCourseAssistance show={show} setShow={setShow} data={row} />
        </div>
      );
    },
  },
];
