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
import { useEditUser } from "../../../../../core/services/api/EditUser";
// import { useEdiClassRoom } from "../../../../../core/services/api/EdiClassRoom";
import { useDetailTerm } from "../../../../../core/services/api/DetailTerm";


const TermEdit = ({ rowId }) => {
  const formRef = useRef(null);
  console.log(rowId)
  const { data } = useDetailTerm(rowId);
  console.log(data);

  const [formValues, setFormValues] = useState({
    depName: "",
    buildingId: "",
    id: "1",
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        termName: data.termName || "",
        departmentId: data.departmentId || "",
        insertDate: data.insertDate || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        expire: data.expire || "",
        departmentName: data.departmentName || "",
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
  const mutation = useEdiClassRoom();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // console.log("Form Ref: ", formRef);
    const formData = new FormData();
    formData.append("Id", formValues.id);
    formData.append("termName", formValues.termName);
    formData.append("departmentId", formValues.departmentId); 
    formData.append("insertDate", formValues.insertDate);
    formData.append("startDate", formValues.startDate); 
    formData.append("endDate", formValues.endDate);
    formData.append("expire", formValues.expire); 
    formData.append("departmentName", formValues.departmentName);    

    console.log(formData);

    const userToast = toast.loading("درحال ویرایش ترم");
    try {
      await mutation.mutateAsync(formValues);
      toast.success("ترم با موفقیت ویرایش شد!", { id: userToast });
      queryClient.invalidateQueries("CourseCat");
    } catch (error) {
      toast.error(
        `ویرایش ترم با مشکل مواجه شد: 
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
        <CardTitle tag="h4">ویرایش ترم</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="termName">
                نام ترم 
              </Label>
              <Input
                type="text"
                name="termName"
                id="termName"
                placeholder="نام ترم را یادداشت کنید"
                value={formValues?.termName}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="departmentId">
                 شماره ساختمان 
              </Label>
              <Input
                type="text"
                name="departmentId"
                id="departmentId"
                placeholder="شماره ساختمان را وارد کنید"
                value={formValues?.departmentId}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="insertDate">
                  تاریخ 
              </Label>
              <Input
                type="date"
                name="insertDate"
                id="insertDate"
                placeholder=" تاریخ را وارد کنید"
                value={formValues?.insertDate}
                onChange={handleInputChange}
              />
            </Col>
             <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="startDate">
                  تاریخ شروع 
              </Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                placeholder=" تاریخ شروع را وارد کنید"
                value={formValues?.startDate}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="endDate">
                  تاریخ شروع 
              </Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                placeholder=" تاریخ پایان را وارد کنید"
                value={formValues?.endDate}
                onChange={handleInputChange}
              />
            </Col>
             <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="expire">
                  تاریخ  
              </Label>
              <Input
                type="date"
                name="expire"
                id="expire"
                placeholder=" تاریخ  را وارد کنید"
                value={formValues?.expire}
                onChange={handleInputChange}
              />
            </Col> 
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="departmentName">
                  نام دپارتمان  
              </Label>
              <Input
                type="date"
                name="departmentName"
                id="departmentName"
                placeholder=" نام دپارتمان  را وارد کنید"
                value={formValues?.departmentName}
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
export { TermEdit };
