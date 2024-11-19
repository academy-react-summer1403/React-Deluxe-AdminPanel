// ** Reactstrap Imports
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
import { useAddBlog } from "../../../../core/services/api/AddBlog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MultipleColumnForm = () => {
  // const [formValues, setFormValues] = useState({
  //   title: "",
  //   googleTitle: "",
  // });
  const formRef = useRef(null);

  const mutation = useAddBlog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Step 2: Collect form data
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());

    console.log(formData);
    console.log("Form Submitted Values:", formValues);

    await mutation.mutateAsync(formData);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">افزودن خبر جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="6" sm="12" className="mb-1 ">
              <Label className="form-label" for="Title">
                عنوان خبر
              </Label>
              <Input
                type="text"
                name="Title"
                id="Title"
                placeholder="عنوان خبر"
                // onChange={}
                // value={}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Input
                type="text"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder=" عنوان گوگل"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="MiniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                type="text"
                name="MiniDescribe"
                id="MiniDescribe"
                placeholder="توضیح کوتاه"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                type="text"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="توضیحات گوگل"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Describe">
                توضیح کامل
              </Label>
              <Input
                type="text"
                name="Describe"
                id="Describe"
                placeholder="توضیح کامل"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Keyword">
                کلمات کلیدی
              </Label>
              <Input
                type="text"
                name="Keyword"
                id="Keyword"
                placeholder="کلمات کلیدی"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="NewsCatregoryId">
                دسته بندی خبر
              </Label>
              <Input
                type="text"
                name="NewsCatregoryId"
                id="NewsCatregoryId"
                placeholder="دسته بندی خبر"
              />
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  // onClick={(e) => e.preventDefault()}
                >
                  ثبت
                </Button>
                <Button outline color="secondary" type="reset">
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default MultipleColumnForm;
