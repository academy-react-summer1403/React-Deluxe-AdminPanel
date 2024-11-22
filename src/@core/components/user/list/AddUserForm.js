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
import { useAddUser } from "../../../../core/services/api/AddUser";
import toast from "react-hot-toast";

const AddUserForm = () => {
  const formRef = useRef(null);

  const mutation = useAddUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
    const userToast = toast.loading("درحال ساختن کاربر");
    try {
      await mutation.mutateAsync(formValues);
      toast.success("کاربر با موفقیت ساخته شد!", { id: userToast });
    } catch (error) {
      toast.error("ساخت کاربر با مشکل مواجه شد:", { id: userToast });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">افزودن کاربر جدید👤</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                نام
              </Label>
              <Input
                type="text"
                name="firstName"
                id="nameMulti"
                placeholder="نام"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                نام خانوادگی
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastNameMulti"
                placeholder="نام خانوادگی"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="cityMulti">
                شماره موبایل
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                id="cityMulti"
                placeholder="شماره موبایل"
              />
            </Col>
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="CountryMulti">
                ایمیل
              </Label>
              <Input
                type="email"
                name="gmail"
                id="CountryMulti"
                placeholder="ایمیل"
              />
            </Col>
            {/* <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CompanyMulti">
                Company
              </Label>
              <Input
                type="text"
                name="company"
                id="CompanyMulti"
                placeholder="Company"
              />
            </Col> */}
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="EmailMulti">
                رمز عبور
              </Label>
              <Input
                type="password"
                name="password"
                id="EmailMulti"
                placeholder="رمز عبور"
              />
            </Col>
            <div className="d-flex">
              <Row>
                <Col md="6" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isTeacher"
                    id="isTeacher"
                    placeholder="رمز عبور"
                  />
                  <Label className="form-label font-medium-2" for="isTeacher">
                    استاد
                  </Label>
                </Col>
                <Col md="6" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isStudent"
                    id="isStudent"
                    placeholder="رمز عبور"
                  />
                  <Label className="form-label font-medium-2" for="isStudent">
                    دانشجو
                  </Label>
                </Col>
              </Row>
            </div>

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
export default AddUserForm;
