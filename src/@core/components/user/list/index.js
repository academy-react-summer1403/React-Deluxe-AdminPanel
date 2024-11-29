// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useUserList } from "../../../../core/services/api/userList";
import { useUserManageInfo } from "../../../../core/services/api/UserManageInfo";
import { useEffect, useState } from "react";

const UsersList = () => {
  const { data: data2 } = useUserList();
  const { data } = useUserManageInfo("1");
  const { data: data3 } = useUserManageInfo("2");
  const { data: data4 } = useUserManageInfo("5");

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربران"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data2?.totalCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="ادمین ها"
            icon={<UserPlus size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.totalCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="اساتید"
            icon={<UserCheck size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data3?.totalCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="دانشجویان"
            icon={<UserX size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data4?.totalCount}</h3>
            }
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UsersList;


