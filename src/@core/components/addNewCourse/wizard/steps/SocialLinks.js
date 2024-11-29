// ** React Imports
import { Fragment, useRef, useState } from "react";

// ** Icons Imports
import { ArrowLeft } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useAddCourse } from "../../../../../core/services/api/AddCourse";
import toast from "react-hot-toast";
import { useAddCourseTech } from "../../../../../core/services/api/AddCourseTech";

const SocialLinks = ({
  stepper,
  type,
  data,
  finalFormData,
  setFinalFormData,
}) => {
  const [selectedTech, setSelectedTech] = useState([]);

  // const formRef = useRef(null);

  const mutation = useAddCourseTech(); // !!!!!!!!!!!!!!!

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(formRef.current);
    // const formValues = Object.fromEntries(formData.entries());
    // console.log(formValues);
    // setFinalFormData((prevFormData) => {
    //   // console.log("prevFormData", prevFormData);
    //   const updatedFormData = new FormData();

    //   for (const [key, value] of prevFormData.entries()) {
    //     updatedFormData.append(key, value);
    //   }

    //   for (const [key, value] of formData.entries()) {
    //     updatedFormData.append(key, value);
    //   }

    //   return updatedFormData;
    // });

    console.log(selectedTech);

    const courseToast = toast.loading("درحال افزودن دوره شما...");
    try {
      await mutation.mutateAsync(selectedTech);
      //   toast.success("دوره شما با موفقیت اضافه شد!", { id: courseToast });
    } catch (error) {
      // toast.error(
      //   `افزودن دوره شما با خطا مواجه شد:
      //   ${
      //     error.response.data.title
      //       ? error.response.data.title
      //       : error.response.data.ErrorMessage
      //   }`,
      //   { id: courseToast }
      // );
    }
  };

  const techOptions = data?.technologyDtos.map((option) => ({
    value: option.id,
    label: option.techName,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedTech(selectedOptions || []); // Update state with selected options
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="8 offset-2" className="mb-1">
            <Label className="form-label" for={`tech`}>
              لیست تکنولوژی ها
            </Label>
            <Select
              isMulti
              placeholder={"لیست تکنولوژی ها"}
              theme={selectThemeColors}
              isClearable={true}
              id={`tech`}
              className="react-select"
              classNamePrefix="select"
              options={techOptions}
              name={"tech"}
              onChange={handleSelectChange} // Capture changes
              // defaultValue={"لیست تکنولوژی ها"}
            />
          </Col>
          {/* <Col md="6" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              Facebook
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="https://facebook.com/abc"
            />
          </Col> */}
        </Row>
        {/* <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`google-${type}`}>
              Google+
            </Label>
            <Input
              type="text"
              id={`google-${type}`}
              name="google"
              placeholder="https://plus.google.com/abc"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`linkedin-${type}`}>
              Linkedin
            </Label>
            <Input
              type="text"
              id={`linkedin-${type}`}
              name="linkedin"
              placeholder="https://linkedin.com/abc"
            />
          </Col>
        </Row> */}
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="success"
            className="btn-submit"
            type="submit"
            // onClick={() => alert("submitted")}
          >
            افزودن دوره
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
