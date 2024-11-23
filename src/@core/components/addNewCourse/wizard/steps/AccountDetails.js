// ** React Imports
import { Fragment, useRef } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const AccountDetails = ({ stepper, type, finalFormData, setFinalFormData }) => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // const formValues = Object.fromEntries(formData.entries());
    console.log(formData);
    setFinalFormData(formData);
  };
  return (
    <Fragment>
      {/* <div className='content-header'>
      </div> */}
      <Form
        onSubmit={handleSubmit}
        innerRef={formRef}
        // className="d-flex flex-column justify-content-between"
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`username-${type}`}>
              موضوع دوره
            </Label>
            <Input
              type="text"
              name={"Title"}
              id={`username-${type}`}
              placeholder=" موضوع دوره"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email-${type}`}>
              توضیحات کوتاه
            </Label>
            <Input
              type="text"
              name={"MiniDescribe"}
              id={`email-${type}`}
              placeholder="توضیحات کوتاه"
              aria-label="john.doe"
            />
          </Col>
          {/* </Row>
        <Row> */}
          <Col className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`password-${type}`}>
              توضیحات
            </Label>
            <Input
              type="text"
              name={"Describe"}
              id={`username-${type}`}
              placeholder="  توضیحات"
            />
          </Col>
          <Col className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`confirm-password-${type}`}>
              ظرفیت
            </Label>
            <Input
              type="text"
              name={"Capacity"}
              id={`username-${type}`}
              placeholder=" موضوع دوره"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={16}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
