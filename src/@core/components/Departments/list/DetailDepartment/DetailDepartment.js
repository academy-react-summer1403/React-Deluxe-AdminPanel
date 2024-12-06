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
import { selectThemeColors } from "@utils";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDepartmentDetail } from "../../../../../core/services/api/DepartmentDetail";
import { useEditDepatment } from "../../../../../core/services/api/EditDepatment";

const DetailDepartment = ({ id }) => {
  const formRef = useRef(null);
  const { data } = useDepartmentDetail(id);
  console.log(data);

  const [formValues, setFormValues] = useState({
    depName: "",
    buildingId: "",
    id: "1"
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        depName: data.depName || "",
        buildingId: data.buildingId || "",
        id: data.id || "",
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
  const mutation = useEditDepatment();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // console.log("Form Ref: ", formRef);
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("depName", formValues.depName);
    formData.append("buildingId", formValues.buildingId);
  


    console.log(formData);
    // mutation.mutateAsync(formData);

    const userToast = toast.loading("درحال افزودن ساختمان");
    try {
      await mutation.mutateAsync(formData);
      toast.success("ساختمان با موفقیت اضافه شد!", { id: userToast });
      queryClient.invalidateQueries("CourseCat");
    } catch (error) {
      toast.error(
        `اضافه کردن ساختمان با مشکل مواجه شد: 
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
        <CardTitle tag="h4">ویرایش  ساختمان</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="depName">
                نام ساختمان  
              </Label>
              <Input
                type="text"
                name="depName"
                id="depName"
                placeholder="نام ساختمان را انتخاب کنید"
                value={formValues?.depName}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="buildingId">
                عنوان در گوگل
              </Label>
              <Input
                type="text"
                name="buildingId"
                id="buildingId"
                placeholder="    شماره ساختمان را یادداشت کنید"
                value={formValues?.buildingId}
                onChange={handleInputChange}
              />
            </Col>
          

            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="succes" type="submit">
                  افزودن
                </Button>
                <Button outline color="danger" type="reset">
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
export { DetailDepartment };
