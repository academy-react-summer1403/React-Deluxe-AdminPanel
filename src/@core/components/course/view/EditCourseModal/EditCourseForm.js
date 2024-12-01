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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEditUser } from "../../../../../core/services/api/EditUser";
import { useCourseDetailStudent } from "../../../../../core/services/api/CourseDetailStudent";
import { GetCreateCourse } from "../../../../../core/services/api/GetCreateCourse";
import { fromJSON } from "postcss";
import { useEditCourse } from "../../../../../core/services/api/EditCourse";

const EditCourseForm = ({ data2, data3 }) => {
  const formRef = useRef(null);

 
  const { data } = useQuery({
    queryKey: ["userdetail"],
  });

  console.log("data:", data);
  console.log("data2:", data2);
  console.log("data3:", data3);

  const [formValues, setFormValues] = useState({
    Id: data?.courseId,
    Title: data?.title,
    GoogleTitle: data2?.googleTitle,
    Capacity: data2?.capacity,
    SessionNumber: data?.paymentDoneTotal,
    Cost: data?.cost,
    CourseTypeId: 1,
    CourseLvlId: 2,
    TremId: 2,
    ClassId: 2,
    TeacherId: data?.teacherId,
    StartTime: data?.startTime?.slice(0, 10),
    EndTime: data?.endTime?.slice(0, 10),
    UniqeUrlString: data2?.uniqeUrlString,
    MiniDescribe: data2?.miniDescribe,
    Describe: data?.describe,
  
  });
  data && data2 && data3 && console.log("formValues", formValues);

  const handleInputChange = (eOrName, valueOrNull) => {
    if (eOrName?.target) {
      // Handle native inputs (e.target case)
      const { name, type, checked, value } = eOrName.target;
      setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      // Handle react-select inputs (custom case)
      const name = eOrName; // The name passed from the select component
      const value = valueOrNull ? valueOrNull.value : ""; // Extract the value from react-select
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const mutation = useEditCourse();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // console.log("Form Ref: ", formRef);
    const formData = new FormData();

    for (const key in formValues) {
      if (Object.hasOwnProperty.call(formValues, key)) {
        formData.append(key, formValues[key]);
      }
    }
    console.log(formData);
    const userToast = toast.loading(" درحال ویرایش دوره");
    try {
      await mutation.mutateAsync(formData);
      toast.success("    دوره با موفقیت ویرایش شد", { id: userToast });
    } catch (error) {
      toast.error(
        `ویرایش دوره انجام نشد ,
        ${
          error.response.data.ErrorMessage
            ? error.response.data.ErrorMessage
            : "خطای تعریف نشده"
        }`,
        { id: userToast }
      );
      console.log(error);
    }
  };

  const CourseTypeIdOptions = data3?.courseTypeDtos?.map((option) => ({
    value: option.id,
    label: option.typeName,
  }));
  console.log(CourseTypeIdOptions);

  const TremIdOptions = data3?.termDtos?.map((option) => ({
    value: option.id,
    label: option.termName,
  }));

  const ClassIdOptions = data3?.classRoomDtos?.map((option) => ({
    value: option?.id,
    label: option?.classRoomName,
  }));

  const CourseLvlIdOptions = data3?.courseLevelDtos?.map((option) => ({
    value: option.id,
    label: option.levelName,
  }));

  const TeacherIdOptions = data3?.teachers?.map((option) => ({
    value: option.teacherId,
    label: option.fullName,
  }));

  // const defaultCourseTypeId =
  //   CourseTypeIdOptions.find((option) => option.value === formValues.active) ||
  //   null; //active bayad avaz she

  // const defaultTremId =
  //   TremIdOptions.find((option) => option.value === formValues.gender) || null;

  // const defaultClassId =
  //   ClassIdOptions.find((option) => option.value === formValues.gender) || null;

  // const defaultCourseLvlId =
  //   CourseLvlIdOptions.find((option) => option.value === formValues.gender) ||
  //   null;

  const defaultTeacherId =
    TeacherIdOptions?.find(
      (option) => option?.value === formValues?.TeacherId
    ) || null;
  console.log(defaultTeacherId);

  return (
    // data &&
    // data2 &&
    // data3 && (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="text-center">
          ویرایش اطلاعات دوره📃
        </CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Title">
                موضوع دوره
              </Label>
              <Input
                type="text"
                name="Title"
                id="Title"
                placeholder="موضوع دوره"
                value={formValues.Title}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                موضوع گوگل
              </Label>
              <Input
                type="text"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder="موضوع گوگل"
                value={formValues.GoogleTitle}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Capacity">
                ظرفیت
              </Label>
              <Input
                type="text"
                name="Capacity"
                id="Capacity"
                placeholder="ظرفیت"
                value={formValues.Capacity}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="SessionNumber">
                تعداد جلسات
              </Label>
              <Input
                type="text"
                name="SessionNumber"
                id="SessionNumber"
                placeholder="تعداد جلسات"
                value={formValues.SessionNumber}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Cost">
                هزینه دوره
              </Label>
              <Input
                type="text"
                name="Cost"
                id="Cost"
                placeholder="هزینه دوره"
                value={formValues.Cost}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="CourseTypeId">
                نوع دوره
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="CourseTypeId"
                className="react-select"
                classNamePrefix="select"
                options={CourseTypeIdOptions}
                name="CourseTypeId"
                defaultValue={{ value: 1, label: "حضوری" }}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("CourseTypeId", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="CourseLvlId">
                سطح دوره
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="CourseLvlId"
                className="react-select"
                classNamePrefix="select"
                options={CourseLvlIdOptions}
                name="CourseLvlId"
                defaultValue={{ value: 2, label: "متوسط" }}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("CourseLvlId", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="TremId">
                ترم دوره
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="TremId"
                className="react-select"
                classNamePrefix="select"
                options={TremIdOptions}
                name="TremId"
                defaultValue={{ value: 2, label: "تابستان 1403" }}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("TremId", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="ClassId">
                کلاس دوره
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="ClassId"
                className="react-select"
                classNamePrefix="select"
                options={ClassIdOptions}
                name="ClassId"
                defaultValue={{ value: 2, label: "ClassRoom 2" }}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("ClassId", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            {TeacherIdOptions && (
              <Col lg="4" md="12" sm="12" className="mb-1">
                <Label className="form-label" for="TeacherId">
                  استاد دوره
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={true}
                  id="TeacherId"
                  className="react-select"
                  classNamePrefix="select"
                  options={TeacherIdOptions}
                  name="TeacherId"
                  defaultValue={
                    defaultTeacherId || { value: 20205, label: "مهدی-اصغری" }
                  }
                  // onChange={handleInputChange}
                  onChange={(selectedOption) =>
                    handleInputChange("TeacherId", selectedOption)
                  }
                  // defaultValue={countryOptions[0]}
                />
              </Col>
            )}

            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="StartTime">
                تاریخ شروع
              </Label>
              <Input
                type="date"
                name="StartTime"
                id="StartTime"
                placeholder="تاریخ شروع"
                value={formValues?.StartTime}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="EndTime">
                تاریخ پایان
              </Label>
              <Input
                type="date"
                name="EndTime"
                id="EndTime"
                placeholder="تاریخ پایان"
                value={formValues?.EndTime}
                onChange={handleInputChange}
                // className=" py-2 px-3 text-xs w-52 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg outline-none border-none"
              />
            </Col>

            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="UniqeUrlString">
                کلمه یکتا
              </Label>
              <Input
                type="text"
                name="UniqeUrlString"
                id="UniqeUrlString"
                placeholder="کلمه یکتا"
                value={formValues.UniqeUrlString}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="MiniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                type="text"
                name="MiniDescribe"
                id="MiniDescribe"
                placeholder="توضیح کوتاه"
                value={formValues.MiniDescribe}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Describe">
                توضیحات
              </Label>
              <Input
                type="textarea"
                name="Describe"
                id="Describe"
                placeholder="توضیحات"
                value={formValues.Describe}
                onChange={handleInputChange}
              />
            </Col>
            {/* <div>
              <Row>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isTecher"
                    id="isTecher"
                    // placeholder="استاد"
                    checked={formValues.isTecher}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isTecher">
                    استاد
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isStudent"
                    id="isStudent"
                    // placeholder="رمز عبور"
                    checked={formValues.isStudent}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isStudent">
                    دانشجو
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isDelete"
                    id="isDelete"
                    // placeholder="رمز عبور"
                    checked={formValues.isDelete}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isDelete">
                    وضعیت دیلیت
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="twoStepAuth"
                    id="twoStepAuth"
                    // placeholder="رمز عبور"
                    checked={formValues.twoStepAuth}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="twoStepAuth">
                    ورود دو مرحله ای
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="receiveMessageEvent"
                    id="receiveMessageEvent"
                    // placeholder="رمز عبور"
                    checked={formValues.receiveMessageEvent}
                    onChange={handleInputChange}
                  />
                  <Label
                    className="form-label font-medium-2"
                    for="receiveMessageEvent"
                  >
                    دریافت پیام های رویداد
                  </Label>
                </Col>
              </Row>
            </div> */}

            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  ویرایش
                </Button>
                <Button outline color="secondary" type="reset">
                  حذف همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    // )
  );
};
export { EditCourseForm };
