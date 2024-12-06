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
import toast from "react-hot-toast";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEditUser } from "../../../../../core/services/api/EditUser";
import { useCatDetail } from "../../../../../core/services/api/CatDetail";
import { useEditCat } from "../../../../../core/services/api/EditCat";

const DetailCatForm = ({ rowId }) => {
  const formRef = useRef(null);
  const { data } = useCatDetail(rowId);
  console.log(data);

  const [formValues, setFormValues] = useState({
    CategoryName: "",
    GoogleTitle: "",
    GoogleDescribe: "",
    Image: '',
    IconAddress: '',
    IconName: ''
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        CategoryName: data.categoryName || "",
        GoogleTitle: data.googleTitle || "",
        GoogleDescribe: data.googleDescribe || "",
      });
    }
  }, [data]);

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

  const queryClient = useQueryClient();
  const mutation = useEditCat();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // console.log("Form Ref: ", formRef);
    const formData = new FormData();
    formData.append("Id", rowId);
    formData.append("CategoryName", formValues.CategoryName);
    formData.append("GoogleTitle", formValues.GoogleTitle);
    formData.append("GoogleDescribe", formValues.GoogleDescribe);
    formData.append("Image", formValues.Image);
    formData.append("IconAddress", formValues.IconAddress);
    formData.append("IconName", formValues.IconName);


    console.log(formData);
    // mutation.mutateAsync(formData);

    const userToast = toast.loading("درحال افزودن تکنولوژی به دوره شما");
    try {
      await mutation.mutateAsync(formData);
      toast.success("تکنولوژی با موفقیت اضافه شد!", { id: userToast });
      queryClient.invalidateQueries("CourseCat");
    } catch (error) {
      toast.error(
        `ساخت دسته بندی با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };

  const activeOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  const GenderOptions = [
    { value: true, label: "مرد" },
    { value: false, label: "زن" },
  ];

  const defaultActive =
    activeOptions.find((option) => option.value === formValues.active) || null;

  const defaultGender =
    GenderOptions.find((option) => option.value === formValues.gender) || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">ویرایش اطلاعات دسته بندی</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="CategoryName">
                عنوان دسته بندی
              </Label>
              <Input
                type="textarea"
                name="CategoryName"
                id="CategoryName"
                placeholder="عنوان دسته بندی را انتخاب کنید"
                value={formValues?.CategoryName}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان در گوگل
              </Label>
              <Input
                type="textarea"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder=" عنوان دسته بندی در گوگل را انتخاب کنید"
                value={formValues?.GoogleTitle}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات در گوگل
              </Label>
              <Input
                type="textarea"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder=" توضیحات دسته بندی در گوگل را انتخاب کنید"
                value={formValues?.GoogleDescribe}
                onChange={handleInputChange}
              />
            </Col>

            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  افزودن
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
  );
};
export { DetailCatForm };
