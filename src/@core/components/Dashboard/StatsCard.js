// ** Third Party Components
import classnames from "classnames";
import { TrendingUp, User, Box, DollarSign } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { AddTeamIcon, Book02Icon, CommentAdd02Icon, LicenseDraftIcon, UserAccountIcon, UserAdd01Icon, UserAdd02Icon, UserArrowLeftRightIcon, UserCheck02Icon, UserCircle02Icon } from "hugeicons-react";

const StatsCard = ({Report, cols }) => {
  const data = [
    {
      title: Report?.allUser,
      subtitle: "کاربران",
      color: "light-primary",
      icon: <User size={24} />,
    },
    {
      title: Report?.deactiveUsers,
      subtitle: "کاریرغیرفعال",
      color: "light-danger",
      icon: <UserAdd01Icon size={24} />,
    },
    {
      title: Report?.allUser - Report?.deactiveUsers,
      subtitle: "کاربر فعال",
      color: "light-info",
      icon: <UserAdd02Icon size={24} />,
    },
    {
      title: Report?.inCompeletUserCount,
      subtitle: "پرداختیها",
      color: "light-success",
      icon: <DollarSign size={24} />,
    },
    {
      title: Report?.allUser - Report?.inCompeletUserCount,
      subtitle: "اساتید",
      color: "light-danger",
      icon: <UserCircle02Icon size={36} />,
    },
    {
      title: Report?.allReserve,
      subtitle: "بلاگ ها",
      color: "light-success",
      icon: <Book02Icon size={36} />,
    },
    {
      title: Report?.allReserveAccept,
      subtitle: "دوره ها",
      color: "light-success",
      icon: <LicenseDraftIcon size={36} />,
    },
    {
      title: Report?.allReserveNotAccept,
      subtitle: "کامنت ها",
      color: "light-primary",
      icon: <CommentAdd02Icon size={36} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-lg-3 mb-0" style={{fontSize:"20px",paddingTop:"3px"}} >{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics d-flex flex-column justify-content-center">
      <CardHeader>
        <CardTitle tag="h4">آمار سایت</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>آخرین آپدیت</CardText>
      </CardHeader>
      <CardBody className="statistics-body d-flex align-items-center" style={{height: "20rem"}}>
        <Row
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%", height: "100%" }}
        >
          {renderData()}
        </Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
