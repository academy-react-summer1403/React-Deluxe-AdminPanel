import React, { Fragment } from "react";
import CourseGroupList from "../@core/components/course/list/CourseGroupList";
import CourseGroupeTable from "../@core/components/course/list/CourseGroupeTable ";

const CourseGroupManage = () => {
  return (
    <Fragment>
      <h2>لیست گروه دوره ها</h2>
      {/* <CourseGroupList /> */}
      <CourseGroupeTable />
    </Fragment>
  );
};

export default CourseGroupManage;
