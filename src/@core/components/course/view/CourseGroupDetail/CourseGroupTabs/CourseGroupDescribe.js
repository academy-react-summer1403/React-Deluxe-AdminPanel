// ** React Imports
import { Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { ChevronDown, ExternalLink } from "react-feather";

const CourseGroupDescribe = ({ data }) => {
  console.log(data);

  return (
    <Card>
      <CardHeader>جزئیات گروه</CardHeader>
      <CardBody className="d-flex justify-content-center">
        <ListGroup style={{ width: "60%" }} flush>
          <ListGroupItem>عنوان: {data?.groupName}</ListGroupItem>
          <ListGroupItem>ظرفیت: {data?.groupCapacity}</ListGroupItem>
          <ListGroupItem>شماره گروه: {data?.groupId}</ListGroupItem>
          <ListGroupItem>عنوان دوره: {data?.courseName}</ListGroupItem>
          <ListGroupItem>ظرفیت دوره: {data?.courseCapacity}</ListGroupItem>
          <ListGroupItem>نام استاد: {data?.teacherName}</ListGroupItem>
          <ListGroupItem>شماره استاد: {data?.teacherId}</ListGroupItem>
          <ListGroupItem>شماره استاد: {data?.teacherId}</ListGroupItem>
          <ListGroupItem
            action
            href={`/courseDetail/${data?.courseId}`}
            tag="a"
          >
            دیدن جزئیات دوره <ExternalLink size={18} />
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default CourseGroupDescribe;
