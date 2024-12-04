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
import { useAddCourseCat } from "../../../../core/services/api/AddCourseCat";

import toast from "react-hot-toast";

const AddCatForm = () => {
  const formRef = useRef(null);

  const mutation = useAddCourseCat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
    const userToast = toast.loading("درحال ساختن دسته بندی جدید");
    try {
      await mutation.mutateAsync(formValues);
      toast.success("دسته بندی با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error("ساخت دسته بندی با مشکل مواجه شد:", { id: userToast });
    }
  };
  return (
    <Card >
      <CardHeader>
        <CardTitle tag="h4">افزودن  دسته بندی جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
              عنوان دسته بندی
              </Label>
              <Input
                type='textarea'
                name="catName"
                id="nameMulti"
                placeholder="عنوان دسته بندی را انتخاب کنید"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
              عنوان در گوگل
              </Label>
              <Input
                 type='textarea'
                name="catTitle"
                id="lastNameMulti"
                placeholder=" عنوان دسته بندی در گوگل را انتخاب کنید"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="cityMulti">
              توضیحات در گوگل
              </Label>
              <Input
                type='textarea'
                name="catDescribe"
                id="cityMulti"
                placeholder=" توضیحات دسته بندی در گوگل را انتخاب کنید"
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
