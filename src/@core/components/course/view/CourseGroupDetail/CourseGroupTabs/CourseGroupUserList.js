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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { useCourseUser } from "../../../core/services/api/CourseUser";
import { Badge } from "reactstrap";

const CourseGroupUserList = ({ data }) => {
  console.log(data);
  const columns = [
    {
      sortable: true,
      minWidth: "130px",
      name: "نام دانشجو",
      selector: (row) => row.studentName,
    },
    {
      name: "معدل کاربر",
      center: true,
      selector: (row) => row.courseGrade,
    },
    {
      name: "وضعیت پرداخت",
      center: true,
      selector: (row) => row.peymentDone,
      cell: (row) => {
        return row?.peymentDone ? (
          <Badge
            color="light-success"
            className="fs-5"
            style={{ width: "80px", textAlign: "center" }}
          >
            پرداخت شده
          </Badge>
        ) : (
          <Badge
            color="light-danger"
            className="fs-5"
            style={{ width: "80px", textAlign: "center" }}
          >
            پرداخت نشده
          </Badge>
        );
      },
    },
    {
      name: "شماره دانشجو",
      center: true,
      selector: (row) => row.studentId,
      sortable: true,
    },
  ];

  const { id } = useParams();

  // const { data } = useCourseUser(id);

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

export default CourseGroupUserList;
