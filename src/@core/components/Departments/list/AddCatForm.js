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

import toast from "react-hot-toast";
import { useAddDepartment } from "../../../../core/services/api/AddDepartment";

const AddCatForm = () => {
  const formRef = useRef(null);

  const mutation = useAddDepartment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    formData.append("id", 1)
    const formValues = Object.fromEntries(formData.entries());
    console.log(formData);
    const userToast = toast.loading("درحال ساختن دپارتمان جدید");
    try {
      await mutation.mutateAsync(formValues);
      toast.success(" دپارتمان با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error(
        `ساخت  دپارتمان با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">افزودن دپارتمان جدید</CardTitle>
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
                placeholder="شماره ساختمان را یادداشت کنید"
              />
            </Col>
          

            <Col sm="12">
              <div className="d-flex justify-content-center">
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
