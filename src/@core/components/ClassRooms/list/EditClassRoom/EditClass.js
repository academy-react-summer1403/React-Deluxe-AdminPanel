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
import {  useQueryClient } from "@tanstack/react-query";
import { useEdiClassRoom } from "../../../../../core/services/api/EditClassRoom";
import { useClassRoomDetail } from "../../../../../core/services/api/DetailClassRoom";


const EditClassRooms = ({ rowId }) => {
  const formRef = useRef(null);
  const { data } = useClassRoomDetail(rowId);
  console.log(data);

  const [formValues, setFormValues] = useState({
    classRoomName: "",
    capacity: "",
    buildingId:"",
    buildingName: "",
    insertDate: "",
    id: "1",
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        classRoomName: data.classRoomName || "",
        capacity: data.capacity || "",
        buildingId: data.buildingId || "",
        buildingName: data.buildingName || "",
        insertDate: data.capacity || "",
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
  
    const formData = new FormData();
    formData.append("Id", formValues.id);
    formData.append("classRoomName", formValues.classRoomName);
    formData.append("capacity", formValues.capacity);    
    formData.append("buildingId", formValues.buildingId);    
    formData.append("buildingName", formValues.buildingName);    
    formData.append("insertDate", formValues.insertDate);    

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
  
}

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
        <CardTitle tag="h4">ویرایش کلاس</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="classRoomName">
                نام کلاس 
              </Label>
              <Input
                type="text"
                name="classRoomName"
                id="classRoomName"
                placeholder="نام کلاس را یادداشت کنید"
                value={formValues?.classRoomName}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="capacity">
                  ظرفیت 
              </Label>
              <Input
                type="text"
                name="capacity"
                id="capacity"
                placeholder=" ظرفیت را وارد کنید"
                value={formValues?.capacity}
                onChange={handleInputChange}
              />
            </Col>
             <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="capacity">
                  ظرفیت 
              </Label>
              <Input
                type="text"
                name="capacity"
                id="capacity"
                placeholder=" شماره ساختمان را وارد کنید"
                value={formValues?.capacity}
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
                placeholder=" شماره ساختمان را وارد کنید"
                value={formValues?.buildingId}
                onChange={handleInputChange}
              />
            </Col> 
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="buildingName">
                  نام ساختمان 
              </Label>
              <Input
                type="text"
                name="buildingName"
                id="buildingName"
                placeholder=" نام ساختمان را وارد کنید"
                value={formValues?.buildingName}
                onChange={handleInputChange}
              />
            </Col>
            {/* <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="insertDate">
                   تاریخ برگزاری 
              </Label>
              <Input
                type="date"
                name="insertDate"
                id="insertDate"
                placeholder=" نام ساختمان را وارد کنید"
                value={formValues?.insertDate}
                onChange={handleInputChange}
              />
            </Col> */}
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
export { EditClassRooms };
