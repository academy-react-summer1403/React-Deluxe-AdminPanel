// ** React Imports
import { Fragment, useRef } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import { useAddCourse } from "../../../../../core/services/api/AddCourse";
import toast from "react-hot-toast";

const Address = ({ stepper, type, finalFormData, setFinalFormData }) => {
  const formRef = useRef(null);

  const mutation = useAddCourse();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // console.log(formData);
    // setFinalFormData((prevFormData) => {
    // console.log("prevFormData", prevFormData);
    const updatedFormData = new FormData();

    for (const [key, value] of finalFormData.entries()) {
      updatedFormData.append(key, value);
    }

    for (const [key, value] of formData.entries()) {
      updatedFormData.append(key, value);
    }

    // return updatedFormData;
    // });
    console.log("UpdatedFormData", updatedFormData);
    const courseToast = toast.loading("درحال افزودن دوره شما...");
    try {
      await mutation.mutateAsync(updatedFormData);
      toast.success("دوره شما با موفقیت اضافه شد!", { id: courseToast });
    } catch (error) {
      toast.error(
        `افزودن دوره شما با خطا مواجه شد:
        ${
          error.response.data.title
            ? error.response.data.title
            : error.response.data.ErrorMessage
        }`,
        { id: courseToast }
      );
    }
  };
  return (
    <Fragment>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`address-${type}`}>
              قیمت
            </Label>
            <Input
              type="text"
              id={`address-${type}`}
              name={"Cost"}
              placeholder="از 1.000 تا 1.000.000.000"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`landmark-${type}`}>
              کلمه یکتا
            </Label>
            <Input
              type="text"
              name={"UniqeUrlString"}
              id={`landmark-${type}`}
              placeholder="کلمه یکتا"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`pincode-${type}`}>
              تاریخ شروع
            </Label>
            <Input
              type="date"
              name={"StartTime"}
              id={`pincode-${type}`}
              placeholder="YYYY/MM/DD"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`city-${type}`}>
              تاریخ پایان
            </Label>
            <Input
              type="date"
              name={"EndTime"}
              id={`city-${type}`}
              placeholder="YYYY/MM/DD"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between m-5">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">مرحله ی بعدی</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">مرحله ی بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Address;
