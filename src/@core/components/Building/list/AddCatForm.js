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
// import { useAddCourseCat } from "../../../../core/services/api/AddCourseCat";
// import { useAddBuilding } from "../../../../core/services/api/AddBuilding;



import toast from "react-hot-toast";
import { useAddBuilding } from "../../../../core/services/api/AddBuilding";

const AddCatForm = () => {
  const formRef = useRef(null);

  const mutation = useAddBuilding();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // const formValues = Object.fromEntries(formData.entries());
    console.log(formData);
    const userToast = toast.loading("درحال ساختن ساختمان  جدید");
    try {
      await mutation.mutateAsync(formData);
      toast.success("ساختمان  با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error(
        `ساخت ساختمان  با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">افزودن  ساختمان جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="CategoryName">
                  نام ساختمان
              </Label>
              <Input
                type="text"
                name="CategoryName"
                id="CategoryName"
                placeholder="نام  ساختمان را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                 طبقه 
              </Label>
              <Input
                type="text"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder="طبقه  را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                  عرض جغرافیایی
              </Label>
              <Input
                type="text"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="عرض  را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                  طول جغرافیایی
              </Label>
              <Input
                type="text"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="طول  را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                   تاریخ
              </Label>
              <Input
                type="text"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="تاریخ  را انتخاب کنید"
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
