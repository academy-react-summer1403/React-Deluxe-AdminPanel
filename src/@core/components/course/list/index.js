// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  CheckSquare,
  XSquare,
  Database,
} from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useAllCourseInfo } from "../../../../core/services/api/LandingReport";
import { useCourseInfo } from "../../../../core/services/api/CourseInfo";

const CourseList = () => {
  const { data } = useAllCourseInfo();
  const { data: data2 } = useCourseInfo(true);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل دوره ها"
            icon={<Database size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.totalCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="دوره های فعال"
            icon={<CheckSquare size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{/* {data2?.} */}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="دوره های غیر فعال"
            icon={<XSquare size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default CourseList;
