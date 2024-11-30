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

const CourseList = () => {
  const { data, isLoading } = useAllCourseInfo();
  // const { data: data2 } = useCourseInfo(true);

  if (isLoading) {
    return console.log("Loading...");
  }
  // const data = [
  //   {
  //     fullName: "محمد سینا -دوستی",
  //     classRoomName: "ClassRoom 1",
  //     typeName: "حضوری",
  //     statusName: "درحال برگزاری",
  //     levelName: "متوسط",
  //     cost: "2000000.00",
  //     isActive: true,
  //     isdelete: false,
  //     isExpire: false,
  //     reserveCount: 1,
  //     title: "مومن دست نزن به این دوره ها",
  //     describe:
  //       "testttestttestttestttestttestttestttes\r\ntttesttptestttestttestttestttestttestttestttestttestt",
  //     tumbImageAddress:
  //       "https://miro.medium.com/v2/resize:fit:1400/0*y6IcBe5J1AdALzXw.png",
  //     lastUpdate: "2024-11-29T16:44:47.973",
  //     courseId: "e6a4b34e-c88f-ef11-b6e6-82fc07f68400",
  //   },
  //   {
  //     fullName: "مهدی-اصغری",
  //     classRoomName: "ClassRoom 1",
  //     typeName: "حضوری",
  //     statusName: "درحال برگزاری",
  //     levelName: "متوسط",
  //     cost: "700000.00",
  //     isActive: false,
  //     isdelete: true,
  //     isExpire: false,
  //     reserveCount: 2,
  //     title: "دوره جامع ری اکت",
  //     describe: "<p>تستتتتستتتتستتتتستتتتستتتتستتتتستتت</p>",
  //     tumbImageAddress:
  //       "https://classapi.sepehracademy.ir/\\Pictures\\Course\\Screenshot (202)_6f0090c5-3899-4cf1-8e68-28c61e445f88.png",
  //     lastUpdate: "2024-11-28T02:26:20.543",
  //     courseId: "572707a8-c98f-ef11-b6e6-82fc07f68400",
  //   },
  //   {
  //     fullName: "محسن-اسفندیاری",
  //     classRoomName: "ClassRoom 2",
  //     typeName: "آنلاین",
  //     statusName: "شروع ثبت نام",
  //     levelName: "متوسط",
  //     cost: "120000.00",
  //     isActive: false,
  //     isdelete: true,
  //     isExpire: false,
  //     reserveCount: 1,
  //     title: "نخیر",
  //     describe: "<p>تستتتتستتتتستتتتستتتتستتتتستتتتستتت</p>",
  //     tumbImageAddress: "skdfjsldf",
  //     lastUpdate: "2024-11-27T18:27:24.793",
  //     courseId: "8af06afb-c98f-ef11-b6e6-82fc07f68400",
  //   },
  // ];

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
      <Table />
    </div>
  );
};

export default CourseList;
