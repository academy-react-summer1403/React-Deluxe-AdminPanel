import { useRef } from "react";
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
import { useAddClassRoom } from "../../../../core/services/api/AddClassRoom";


import toast from "react-hot-toast";

const AddCatForm = () => {
  const formRef = useRef(null);

  const mutation = useAddClassRoom();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formData);
    const userToast = toast.loading("درحال ساختن  کلاس جدید");
    try {
      await mutation.mutateAsync(formValues);
      toast.success(" کلاس با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error(
        `ساخت  کلاس با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };
  return (
    <Card style={{width:"350px"}}>
      <CardHeader>
        <CardTitle tag="h4">افزودن  کلاس جدید</CardTitle>
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
                placeholder="نام کلاس را انتخاب کنید"
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
                placeholder="ظرفیت را وارد کنید"
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
                placeholder="شماره ساختمان را انتخاب کنید"
              />
            </Col>

            <Col sm="10">
              <div className="d-flex justify-content-center m-2">
                <Button className="me-1" color="success" type="submit">
                  افزودن
                </Button>
                <Button outline color="danger" type="reset">
                  لغو
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AddCatForm;
