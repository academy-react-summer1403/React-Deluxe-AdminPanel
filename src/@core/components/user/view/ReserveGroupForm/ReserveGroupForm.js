import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
// import { useAddUser } from "../../../../core/services/api/AddUser";
import toast from "react-hot-toast";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEditUser } from "../../../../../core/services/api/EditUser";
import { getQuery } from "../../../../../core/services/api/ReactQuery/getQuery";
import { useCourseGroups } from "../../../../../core/services/api/CourseGroups";
import { useAcceptCourseReserve } from "../../../../../core/services/api/AcceptCourseReserve";

// ReserveCourse Tab Inside UserDetail
const ReserveGroupForm = ({ row, setGroupId, groupId }) => {
  //   const mutation = useEditUser();
  // Handle form submission
  console.log(row)
  const [IsSelected, setIsSelected] = useState();
  const mutate = useAcceptCourseReserve();
  const queryClient = useQueryClient();

  const handleSubmit = async (e, studentId, courseId) => {
    e.preventDefault();
    console.log(studentId, courseId);
    const courseToast = toast.loading("درحال تبدیل رزرو به دوره");
    try {
      await mutate.mutateAsync({
        studentId,
        courseId,
        courseGroupId: groupId.value,
      });
      toast.success("دوره با موفقیت اضافه شد!", { id: courseToast });
      queryClient.invalidateQueries("UserDetail");
    } catch (error) {
      toast.error(
        `تبدیل رزرو با خطا مواجه شد
      ${
        error.response.data.title
          ? error.response.data.title
          : error.response.data.ErrorMessage
      }`,
        { id: courseToast }
      );
    }
  };
  console.log(row);

  getQuery("CourseDetail", `/Course/${row.courseId}`);
  const { data } = useQuery({
    queryKey: ["CourseDetail"],
  });

  console.log(data);

  const { data: data3 } = useCourseGroups(row.courseId, data?.teacherId);
  console.log(data3);

  const GroupOptions = data3?.map((option) => ({
    value: option?.groupId,
    label: option?.groupName,
  }));

  console.log(IsSelected);

  return (
    <Form
      className=" d-flex flex-column justify-content-center align-items-center items-center"
      style={{ width: "100%" }}
      onSubmit={(e) => handleSubmit(e, row?.studentId, row?.courseId)}
    >
      <Col md="9" sm="12" className="mb-1">
        <Select
          theme={selectThemeColors}
          isClearable={true}
          isOptionSelected={() => setIsSelected(true)}
          id={"News"}
          className="react-select"
          classNamePrefix="select"
          options={GroupOptions}
          name={"NewsCatregoryId"}
          placeholder="انتخاب کنید"
          onChange={(e) => setGroupId(e)}
          // defaultValue={countryOptions[0]}
        />
      </Col>
      <Col lg="2" sm="12">
        {IsSelected && (
          <div className="d-flex">
            <Button
              className="me-1"
              style={{ width: "auto" }}
              color="primary"
              type="submit"
            >
              تایید رزرو
            </Button>
          </div>
        )}
      </Col>
    </Form>
  );
};
export { ReserveGroupForm };
