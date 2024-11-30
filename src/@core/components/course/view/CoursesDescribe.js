// ** React Imports
import { Fragment } from "react";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { useQuery } from "@tanstack/react-query";

const CoursesDescribe = () => {
  const { data } = useQuery({
    queryKey: ["userdetail"],
  });
  console.log(data);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">توضیحات دوره</CardTitle>
        </CardHeader>
        <CardBody>
          <span>{data?.describe}</span>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CoursesDescribe;
