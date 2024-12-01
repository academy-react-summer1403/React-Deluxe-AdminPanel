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
import toast from "react-hot-toast";
import { useAddBlogCategory } from "../../../../core/services/api/AddBlogCategory";
import Select from "react-select";
import { selectThemeColors } from "./../../../../utility/Utils";

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
    // const formValues = Object.fromEntries(formData.entries());

    console.log(formData);
    // console.log("Form Submitted Values:", formValues);
    const blogToast = toast.loading("درحال افزودن بلاگ شما...");
    try {
      await mutation.mutateAsync(formData);
      toast.success("بلاگ شما با موفقیت اضافه شد!", { id: blogToast });
    } catch (error) {
      toast.error(
        `افزودن بلاگ شما با خطا مواجه شد:
        ${
          error.response.data.title
            ? error.response.data.title
            : error.response.data.ErrorMessage
        }`,
        { id: blogToast }
      );
    }
    // {
    //   mutation.isPending ? (blogToast = toast.loading("Adding...")) : "";
    // }
  };

  const { data } = useAddBlogCategory();
  console.log(data);

  const categoryOptions = data?.map((option) => ({
    value: option.id,
    label: option.categoryName,
  }));

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
              <Label className="form-label" for={"NewsCatregoryId"}>
                نوع دوره
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id={"NewsCatregoryId"}
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                name={"NewsCatregoryId"}
                placeholder="انتخاب کنید"
                // defaultValue={countryOptions[0]}
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
            <Col md="12" sm="12" className="mb-1">
              <Label className="form-label" for="Describe">
                توضیح کامل
              </Label>
              <Input
                type="textarea"
                name="Describe"
                id="Describe"
                placeholder="توضیح کامل"
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
                  {mutation.isPending ? "درحال افزودن..." : "افزودن"}
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
