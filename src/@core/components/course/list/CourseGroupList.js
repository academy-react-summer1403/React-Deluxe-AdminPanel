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
import { CourseIcon, DeadIcon } from "hugeicons-react";
import CourseGroupeTable from "./CourseGroupeTable ";

const CourseGroupList = () => {
  const { data, isLoading } = useAllCourseInfo();
  // const { data: data2 } = useCourseInfo(true);

  if (isLoading) {
    return console.log("Loading...");
  }

  const countActiveItems = (data) => {
    return data.filter((item) => item?.isActive === true).length;
  };

  const countDeactiveItems = (data) => {
    return data.filter((item) => item?.isActive === false).length;
  };

  const countExpireItems = (data) => {
    return data.filter((item) => item?.isExpire === true).length;
  };

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل دوره ها"
            icon={<CourseIcon size={20} color={"#7367f0"} variant={"stroke"} />}
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
            renderStats={
              <h3 className="fw-bolder mb-75">
                {countActiveItems(data.courseDtos)}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="دوره های غیر فعال"
            icon={<XSquare size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {countDeactiveItems(data.courseDtos)}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // color="#f8e71c"
            // style={{ backgroundColor: "#f8e71c" }}
            statTitle="دوره های منقضی شده"
            icon={<DeadIcon size={20} color={"#000"} variant={"stroke"} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {countExpireItems(data.courseDtos)}
              </h3>
            }
          />
        </Col>
      </Row>
      <CourseGroupeTable />
    </div>
  );
};

export default CourseGroupList;
