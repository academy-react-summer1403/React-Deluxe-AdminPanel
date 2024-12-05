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
import { useAddBlogCategory } from "../../../../../core/services/api/AddBlogCategory";
import { useEditBlog } from "../../../../../core/services/api/EditBlog";

const EditBlogForm = ({ data }) => {
  const formRef = useRef(null);

  // const mutation = useAddUser();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(formRef.current);
  //   const formValues = Object.fromEntries(formData.entries());
  //   console.log(formValues);
  //   const userToast = toast.loading("درحال ساختن کاربر");
  //   try {
  //     await mutation.mutateAsync(formValues);
  //     toast.success("کاربر با موفقیت ساخته شد!", { id: userToast });
  //   } catch (error) {
  //     toast.error("ساخت کاربر با مشکل مواجه شد:", { id: userToast });
  //   }
  // };
  const { id } = useParams();
  // const { data } = useQuery({
  //   queryKey: ["GetBlogDetails", id],
  // });
  console.log("data:", data);

  const [formValues, setFormValues] = useState({
    Id: id,
    Title: data?.detailsNewsDto?.title,
    GoogleTitle: data?.detailsNewsDto?.googleTitle,
    // Capacity: data2?.capacity,
    // SessionNumber: data?.paymentDoneTotal,
    // Cost: data?.cost,
    // CourseTypeId: 1,
    // CourseLvlId: 2,
    // TremId: 2,
    // ClassId: 2,
    // TeacherId: data?.teacherId,
    // StartTime: data?.startTime?.slice(0, 10),
    // EndTime: data?.endTime?.slice(0, 10),
    // UniqeUrlString: data2?.uniqeUrlString,
    MiniDescribe: data?.detailsNewsDto?.miniDescribe,
    Describe: data?.detailsNewsDto?.describe,
    GoogleDescribe: data?.detailsNewsDto?.googleDescribe,
    Keyword: data?.detailsNewsDto?.keyword,
    // Image: data?.detailsNewsDto?.currentImageAddress,
    NewsCatregoryId: data?.detailsNewsDto?.newsCatregoryId,
    Active: data?.detailsNewsDto?.active,
    // CourseTypeId: data?.CourseTypeId,
    // userAbout: data?.userAbout,
    // birthDay: data?.birthDay.slice(0, 10),
    // gender: data?.gender,
    // gmail: data?.gmail,
    // recoveryEmail: data?.recoveryEmail,
    // telegramLink: data?.telegramLink,
    // linkdinProfile: data?.linkdinProfile,
    // homeAdderess: data?.homeAdderess,
    // longitude: data?.longitude,
    // latitude: data?.latitude,
    // receiveMessageEvent: data?.receiveMessageEvent,
    // isDelete: data?.isDelete,
    // isTecher: data?.isTecher,
    // isStudent: data?.isStudent,
    // twoStepAuth: data?.twoStepAuth,
    // currentPictureAddress: data?.currentPictureAddress,
    // insertDate: data?.insertDate,
  });
  data && console.log("formValues", formValues);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setFormValues({ fName: "Jane", lName: "Smith" });
  //   }, 3000);
  // }, []);

  // const handleInputChange = (e) => {
  //   console.log(e.target);
  //   const { name, type, checked, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  //   console.log("Form Values:", formValues);
  // };

  const { data: data2 } = useAddBlogCategory();
  console.log(data2);

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

  const mutation = useEditBlog();

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
    const Image = document.getElementById("Image");
    formData.append("Image", Image.files[0]);
    console.log(formData);
    const userToast = toast.loading("درحال ویرایش مقاله");
    try {
      await mutation.mutateAsync(formData);
      toast.success("ویرایش مقاله با موفقیت شد!", { id: userToast });
    } catch (error) {
      toast.error(
        `ویرایش مقاله با مشکل مواجه شد:,
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

  console.log("data2", data2);

  const categoryOptions = data2?.map((option) => ({
    value: option.id,
    label: option.categoryName,
  }));

  console.log("categoryOptions", categoryOptions);

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

  const defaultCategoryId = categoryOptions?.find(
    (option) => option.value === formValues?.NewsCatregoryId
  );
  console.log("defaultCategoryId", defaultCategoryId);

  return (
    // data &&
    // data2 &&
    // data3 && (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="text-center">
          ویرایش اطلاعات مقاله📰
        </CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col lg="5" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Title">
                عنوان
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
            <Col lg="7" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
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
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Keyword">
                کلمات کلیدی
              </Label>
              <Input
                type="text"
                name="Keyword"
                id="Keyword"
                placeholder="ظرفیت"
                value={formValues.Keyword}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="NewsCatregoryId">
                انتخاب دسته بندی
              </Label>
              {defaultCategoryId && (
                <Select
                  theme={selectThemeColors}
                  isClearable={true}
                  id="NewsCatregoryId"
                  className="react-select"
                  classNamePrefix="select"
                  options={categoryOptions}
                  name="NewsCatregoryId"
                  defaultValue={defaultCategoryId}
                  // onChange={handleInputChange}
                  onChange={(selectedOption) =>
                    handleInputChange("NewsCatregoryId", selectedOption)
                  }
                  // defaultValue={countryOptions[0]}
                />
              )}
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
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
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                type="textarea"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="توضیحات"
                value={formValues.GoogleDescribe}
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
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Image">
                آپلود عکس
              </Label>
              <Input
                type="file"
                name="Image"
                id="Image"
                placeholder="توضیحات"
                // value={formValues.Image}
                // onChange={handleInputChange}
              />
            </Col>

            <Col md="4" sm="12" className="mb-1 d-flex gap-1">
              <Input
                type="checkbox"
                name="Active"
                id="Active"
                // placeholder="استاد"
                checked={formValues.Active}
                onChange={handleInputChange}
              />
              <Label className="form-label font-medium-2" for="Active">
                فعال بودن
              </Label>
            </Col>

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
export { EditBlogForm };
