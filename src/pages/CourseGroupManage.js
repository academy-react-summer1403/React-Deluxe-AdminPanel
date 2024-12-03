import React, { Fragment } from "react";
import CourseGroupList from "../@core/components/course/list/CourseGroupList";
import CourseGroupeTable from "../@core/components/course/list/CourseGroupeTable ";
import { Badge } from "reactstrap";

const CourseGroupManage = () => {
  return (
    <div className="d-flex flex-column">
      <Badge className="text-center fs-2 p-2" color="primary" pill>
        لیست گروه دوره ها
      </Badge>
      {/* <CourseGroupList /> */}
      <CourseGroupeTable />
    </div>
  );
};

export default CourseGroupManage;
