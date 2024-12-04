// ** React Imports
import { Fragment, useRef } from "react";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const PersonalInfo = ({ stepper, type, data, setFinalFormData }) => {
  const formRef = useRef(null);

 

  const levelOptions = data?.courseLevelDtos.map((option) => ({
    value: option.id,
    label: option.levelName,
  }));

  const termOptions = data?.termDtos.map((option) => ({
    value: option.id,
    label: option.termName,
  }));

  const classroomOptions = data?.classRoomDtos.map((option) => ({
    value: option.id,
    label: option.classRoomName,
  }));

  const typeOptions = data?.courseTypeDtos.map((option) => ({
    value: option.id,
    label: option.typeName,
  }));

  const teacherOptions = data?.teachers.map((option) => ({
    value: option.teacherId,
    label: option.fullName ? option.fullName : "استاد ناشناس",
  }));

  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData);
    // setFinalFormData({...finalFormData,...formData });
    setFinalFormData((prevFormData) => {
      // console.log("prevFormData", prevFormData);
      const updatedFormData = new FormData();

      for (const [key, value] of prevFormData.entries()) {
        updatedFormData.append(key, value);
      }

      for (const [key, value] of formData.entries()) {
        updatedFormData.append(key, value);
      }

      return updatedFormData;
    });
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              نوع دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={true}
              id={`first-name-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={typeOptions}
              name={"CourseTypeId"}
              placeholder="انتخاب کنید"
            />
          
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`last-name-${type}`}>
              استاد دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={true}
              id={`last-name-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={teacherOptions}
              name={"TeacherId"}
              placeholder="انتخاب کنید"
            />
    
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              سطح دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={true}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={levelOptions}
              name={"CourseLvlId"}
              placeholder="انتخاب کنید"
              // defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`language-${type}`}>
              ترم
            </Label>
            <Select
              // isMulti
              isClearable={true}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={termOptions}
              className="react-select"
              classNamePrefix="select"
              name={"TremId"}
              placeholder="انتخاب کنید"
              
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`language-${type}`}>
              کلاس دوره
            </Label>
            <Select
              // isMulti
              isClearable={true}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={classroomOptions}
              className="react-select"
              classNamePrefix="select"
              name={"ClassId"}
              placeholder="انتخاب کنید"

            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`last-name-${type}`}>
              تعداد جلسه
            </Label>
            <Input
              type="text"
              name="SessionNumber"
              id={`last-name-${type}`}
              placeholder=""
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
            <span className="align-middle d-sm-inline-block d-none">
              مرحله قبلی
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعد
            </span>
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

export default PersonalInfo;
