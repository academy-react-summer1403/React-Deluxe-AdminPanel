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
import { useAddTerm } from "../../../../core/services/api/AddTerm";



import toast from "react-hot-toast";

const AddCatForm = () => {
  const formRef = useRef(null);

  const mutation = useAddTerm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    // console.log(formData);
    const userToast = toast.loading("درحال ساختن  ترم جدید");
    try {
      await mutation.mutateAsync(formValues);
      toast.success(" ترم با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error(
        `ساخت   ترم با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };
  return (
    <Card style={{width:"350px"}}>
      <CardHeader>
        <CardTitle tag="h4">افزودن  ترم جدید</CardTitle>
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
                placeholder="نام ترم را انتخاب کنید"
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
                placeholder="تاریخ شروع را وارد کنید"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="endDate">
                   تاریخ پایان
              </Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                placeholder="تاریخ پایان را وارد کنید"
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
