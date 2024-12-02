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
import { useParams } from "react-router-dom";
import { Badge } from "reactstrap";
import { DatePersianizer } from "./../../../../../../utility/utils/DatePersianizer";

const CourseGroupScheduleList = ({ data }) => {
  console.log(data);
  const columns = [
    {
      minWidth: "130px",
      name: "تاریخ شروع",
      selector: (row) => DatePersianizer(row?.startDate),
    },
    {
      name: "ساعت شروع",
      selector: (row) => row?.startTime,
    },
    {
      name: "تاریخ پایان",
      selector: (row) => DatePersianizer(row?.endDate),
    },
    {
      name: "ساعت پایان",
      selector: (row) => row?.endTime,
    },
    {
      name: "وضعیت تشکیل",
      // selector: (row) => row.peymentDone,
      cell: (row) => {
        return row?.forming ? (
          <Badge
            color="light-success"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            تشکیل میشود
          </Badge>
        ) : (
          <Badge
            color="light-danger"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            تشکیل نمیشود
          </Badge>
        );
      },
    },
    {
      name: "وضعیت LockToRaise?",
      // selector: (row) => row.peymentDone,
      cell: (row) => {
        return row?.lockToRaise ? (
          <Badge
            color="light-success"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            تشکیل میشود???
          </Badge>
        ) : (
          <Badge
            color="light-danger"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            تشکیل نمیشود???
          </Badge>
        );
      },
    },
  ];

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

export default CourseGroupScheduleList;
