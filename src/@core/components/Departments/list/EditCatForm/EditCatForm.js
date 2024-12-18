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
import { useEditDepatment } from "../../../../../core/services/api/EditDepartment";
import { useDepartmentDetail } from "../../../../../core/services/api/DepartmentDetail";

const EditCatForm = ({ rowId }) => {
  const formRef = useRef(null);
  console.log(rowId)
  const { data } = useDepartmentDetail(rowId);
  console.log(data);

  const [formValues, setFormValues] = useState({
    depName: "",
    buildingId: "",
    id: "1",
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
    formData.append("Id", formValues.id);
    formData.append("depName", formValues.depName);
    formData.append("buildingId", formValues.buildingId);    
    console.log(formData);

    const userToast = toast.loading("درحال ویرایش دپارتمان");
    try {
      await mutation.mutateAsync(formValues);
      toast.success("دپارتمان با موفقیت ویرایش شد!", { id: userToast });
      queryClient.invalidateQueries("CourseCat");
    } catch (error) {
      toast.error(
        `ویرایش دپارتمان با مشکل مواجه شد: 
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
        <CardTitle tag="h4">ویرایش دپارتمان</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="depName">
                نام دپارتمان 
              </Label>
              <Input
                type="text"
                name="depName"
                id="depName"
                placeholder="نام دپارتمان را یادداشت کنید"
                value={formValues?.depName}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="buildingId">
                 شماره ساختمان 
              </Label>
              <Input
                type="text"
                name="buildingId"
                id="buildingId"
                placeholder="شماره ساختمان را وارد کنید"
                value={formValues?.buildingId}
                onChange={handleInputChange}
              />
            </Col>
            <Col sm="12">
              <div className="d-flex justify-content-center">
                <Button className="me-1" color="success" type="submit">
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
export { EditCatForm };
