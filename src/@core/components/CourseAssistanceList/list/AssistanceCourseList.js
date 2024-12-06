// ** User List Component
import AssistanceWorkTable from "./AssistanceCourseTable";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { Book } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
// import { useGetAllCourses } from "../../../core/services/api/Admin/handelUsers";
import AssistanceCourseTable from "./AssistanceCourseTable";
import { useGetAllCourses } from "../../../../core/services/api/useGetAllCourses";

const AssistanceCourseList = () => {
  const { data } = useGetAllCourses({ currentPage: null, rowsPerPage: null });
  const totalUser = data?.totalCount;

  return (
    <div className="app-user-list">
      {/* <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد دوره ها"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalUser}</h3>}
          />
        </Col>
      </Row> */}
      <AssistanceCourseTable />
    </div>
  );
};

export default AssistanceCourseList;
