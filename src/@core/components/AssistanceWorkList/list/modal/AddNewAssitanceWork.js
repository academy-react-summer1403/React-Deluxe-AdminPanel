import { useFormik } from "formik";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  useGetBuildingList,
  useUpdateBuilding,
} from "../../../../core/services/api/Admin/handelBulding";
import { toast } from "react-toastify";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useUpdateClassRoom } from "../../../../core/services/api/Admin/handelClassRom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAssistanceCourseList } from "../../../../core/services/api/Admin/handelCourseAssistance";
import { useEffect, useRef, useState } from "react";
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../../core/utils/dateUtils";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useAddAssistanceWork } from "../../../../core/services/api/Admin/HandelAssistanceWork";
const AddNewAssitanceWork = ({ setShow, show, data }) => {
  //handel options
  const { data: Builds } = useGetAssistanceCourseList();

  const options =
    Builds &&
    Builds?.map((item) => ({
      value: item?.id,
      label: item?.assistanceName + "...." + item?.courseName,
    }));
  const { mutate: UpdateProfile } = useAddAssistanceWork();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      worktitle: "",
      workDescribe: "",
      assistanceId: options?.[0]?.value || "",
      workDate: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  اضافه شد");
            queryClient.invalidateQueries("GetAssistanceWorkList");

            setShow(false);
          } else {
            toast.error("خطا در اضافه کردن");
          }
        },
      });
    },
  });

  //calender
  const [calendar, setCalendar] = useState(false);
  const CalenderRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (CalenderRef.current && !CalenderRef.current.contains(event.target)) {
        setCalendar(false);
      }
    };

    if (calendar) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendar]);

  const handelChangeData = (dateOfDatePiker) => {
    const convert = `${
      dateOfDatePiker
        ? dateOfDatePiker.convert(persian, persian_en).format()
        : ""
    }`;

    const Iso = convertJalaliToIso(convert);

    //set value
    formik.setFieldValue("workDate", Iso);
    setCalendar(false);
  };

  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-sm"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن منتور برای دوره </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="worktitle">
                  عنوان کار{" "}
                </Label>
                <Input
                  id="worktitle"
                  name="worktitle"
                  placeholder="عنوان کار   را وارد کنید"
                  {...formik?.getFieldProps("worktitle")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="workDescribe">
                  توضیحات{" "}
                </Label>
                <Input
                  id="workDescribe"
                  type="textarea"
                  name="workDescribe"
                  placeholder="   توضیحات کار  را وارد کنید"
                  {...formik?.getFieldProps("workDescribe")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  نام منتور...دوره{" "}
                </Label>
                <Select
                  id="assistanceId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options}
                  theme={selectThemeColors}
                  value={
                    options &&
                    options?.find(
                      (option) => option.value === formik.values.assistanceId
                    )
                  }
                  onChange={(data) => {
                    formik.setFieldValue("assistanceId", data?.value || "");
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" className="text-start">
                <Label htmlFor="">تاریخ شغل </Label>
                <Input
                  id="workDate"
                  type="text"
                  readOnly
                  placeholder="   تاریخ پرداخت  را وارد کنید"
                  className="text-center"
                  onFocus={() => {
                    setCalendar(true);
                  }}
                  value={
                    formik.values.workDate
                      ? convertIsoToJalali(formik.values.workDate)
                      : ""
                  }
                />

                {calendar && (
                  <Calendar
                    ref={CalenderRef}
                    // value={
                    //   formik.values.birthDay &&
                    //   convertIsoToJalali(formik?.values?.birthDay)
                    // }
                    onChange={handelChangeData}
                    calendar={persian}
                    locale={persian_fa}
                    className="position-absolute"
                    style={{
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddNewAssitanceWork;
