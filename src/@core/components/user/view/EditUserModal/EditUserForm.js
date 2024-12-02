import { useEffect, useRef, useState } from "react";
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
// import { useAddUser } from "../../../../core/services/api/AddUser";
import toast from "react-hot-toast";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEditUser } from "../../../../../core/services/api/EditUser";

const EditUserForm = () => {
  const formRef = useRef(null);

  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["UserDetail", id],
  });
  // console.log(data);

  const [formValues, setFormValues] = useState({
    id: data?.id,
    fName: data?.fName,
    lName: data?.lName,
    userName: data?.userName,
    phoneNumber: data?.phoneNumber,
    nationalCode: data?.nationalCode,
    active: data?.active,
    userAbout: data?.userAbout,
    birthDay: data?.birthDay.slice(0, 10),
    gender: data?.gender,
    gmail: data?.gmail,
    recoveryEmail: data?.recoveryEmail,
    telegramLink: data?.telegramLink,
    linkdinProfile: data?.linkdinProfile,
    homeAdderess: data?.homeAdderess,
    longitude: data?.longitude,
    latitude: data?.latitude,
    receiveMessageEvent: data?.receiveMessageEvent,
    isDelete: data?.isDelete,
    isTecher: data?.isTecher,
    isStudent: data?.isStudent,
    twoStepAuth: data?.twoStepAuth,
    currentPictureAddress: data?.currentPictureAddress,
    insertDate: data?.insertDate,
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFormValues({ fName: "Jane", lName: "Smith" });
  //   }, 3000);
  // }, []);

  // const handleInputChange = (e) => {
  //   console.log(e.target);
  //   const { name, type, checked, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  //   console.log("Form Values:", formValues);
  // };

  const handleInputChange = (eOrName, valueOrNull) => {
    if (eOrName?.target) {
      // Handle native inputs (e.target case)
      const { name, type, checked, value } = eOrName.target;
      setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      // Handle react-select inputs (custom case)
      const name = eOrName; // The name passed from the select component
      const value = valueOrNull ? valueOrNull.value : ""; // Extract the value from react-select
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const mutation = useEditUser();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // console.log("Form Ref: ", formRef);
    mutation.mutateAsync(formValues);
  };

  const activeOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  const GenderOptions = [
    { value: true, label: "مرد" },
    { value: false, label: "زن" },
  ];

  const defaultActive =
    activeOptions.find((option) => option.value === formValues.active) || null;

  const defaultGender =
    GenderOptions.find((option) => option.value === formValues.gender) || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">ویرایش اطلاعات کاربر👤</CardTitle>
      </CardHeader>

      {/* <Formik >
</Formik> */}

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="fName">
                نام
              </Label>
              <Input
                type="text"
                name="fName"
                id="fName"
                placeholder="نام"
                value={formValues.fName}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="lName">
                نام خانوادگی
              </Label>
              <Input
                type="text"
                name="lName"
                id="lName"
                placeholder="نام خانوادگی"
                value={formValues.lName}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userName">
                نام کاربری
              </Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="نام کاربری"
                value={formValues.userName}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="phoneNumber">
                شماره موبایل
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="شماره موبایل"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="nationalCode">
                کد ملی
              </Label>
              <Input
                type="text"
                name="nationalCode"
                id="nationalCode"
                placeholder="کد ملی"
                value={formValues.nationalCode}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="active">
                وضعیت
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="active"
                className="react-select"
                classNamePrefix="select"
                options={activeOptions}
                name="active"
                defaultValue={defaultActive}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("active", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userAbout">
                درباره کاربر
              </Label>
              <Input
                type="textarea"
                name="userAbout"
                id="userAbout"
                placeholder="درباره کاربر"
                value={formValues.userAbout}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="birthDay">
                تاریخ تولد
              </Label>
              <Input
                type="date"
                name="birthDay"
                id="birthDay"
                placeholder="29 اردیبهشت 1403 - 5 خرداد 1403"
                value={formValues.birthDay}
                onChange={handleInputChange}
                // className=" py-2 px-3 text-xs w-52 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg outline-none border-none"
              />
            </Col>
            {/* <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="insertDate">
                تاریخ تولد
              </Label>
              <Input
                type="date"
                name="insertDate"
                id="insertDate"
                placeholder="29 اردیبهشت 1403 - 5 خرداد 1403"
                value={formValues.insertDate}
                onChange={handleInputChange}
                // className=" py-2 px-3 text-xs w-52 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg outline-none border-none"
              />
            </Col> */}
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="gender">
                جنسیت
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="gender"
                className="react-select"
                classNamePrefix="select"
                options={GenderOptions}
                name="gender"
                defaultValue={defaultGender}
                // onChange={handleInputChange}
                onChange={(selectedOption) =>
                  handleInputChange("gender", selectedOption)
                }
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="gmail">
                ایمیل
              </Label>
              <Input
                type="text"
                name="gmail"
                id="gmail"
                placeholder="ایمیل"
                value={formValues.gmail}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="recoveryEmail">
                ایمیل بازیابی
              </Label>
              <Input
                type="text"
                name="recoveryEmail"
                id="recoveryEmail"
                placeholder="ایمیل بازیابی"
                value={formValues.recoveryEmail}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="telegramLink">
                لینک تلگرام
              </Label>
              <Input
                type="text"
                name="telegramLink"
                id="telegramLink"
                placeholder="لینک تلگرام"
                value={formValues.telegramLink}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="linkdinProfile">
                لینک لینکدین
              </Label>
              <Input
                type="text"
                name="linkdinProfile"
                id="linkdinProfile"
                placeholder="لینک لینکدین"
                value={formValues.linkdinProfile}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="homeAdderess">
                آدرس کاربر
              </Label>
              <Input
                type="textarea"
                name="homeAdderess"
                id="homeAdderess"
                placeholder="آدرس کاربر"
                value={formValues.homeAdderess}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="longitude">
                طول جغرافیایی
              </Label>
              <Input
                type="text"
                name="longitude"
                id="longitude"
                placeholder="طول جغرافیایی"
                value={formValues.longitude}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="latitude">
                عرض جغرافیایی
              </Label>
              <Input
                type="text"
                name="latitude"
                id="latitude"
                placeholder="عرض جغرافیایی"
                value={formValues.latitude}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="currentPictureAddress">
                عکس پروفایل
              </Label>
              <Input
                type="text"
                name="currentPictureAddress"
                id="currentPictureAddress"
                placeholder="29 اردیبهشت 1403 - 5 خرداد 1403"
                value={formValues.currentPictureAddress}
                onChange={handleInputChange}
                // className=" py-2 px-3 text-xs w-52 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg outline-none border-none"
              />
            </Col>
            <div>
              <Row>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isTecher"
                    id="isTecher"
                    // placeholder="استاد"
                    checked={formValues.isTecher}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isTecher">
                    استاد
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isStudent"
                    id="isStudent"
                    // placeholder="رمز عبور"
                    checked={formValues.isStudent}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isStudent">
                    دانشجو
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="isDelete"
                    id="isDelete"
                    // placeholder="رمز عبور"
                    checked={formValues.isDelete}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="isDelete">
                    وضعیت دیلیت
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="twoStepAuth"
                    id="twoStepAuth"
                    // placeholder="رمز عبور"
                    checked={formValues.twoStepAuth}
                    onChange={handleInputChange}
                  />
                  <Label className="form-label font-medium-2" for="twoStepAuth">
                    ورود دو مرحله ای
                  </Label>
                </Col>
                <Col md="4" sm="12" className="mb-1 d-flex gap-1">
                  <Input
                    type="checkbox"
                    name="receiveMessageEvent"
                    id="receiveMessageEvent"
                    // placeholder="رمز عبور"
                    checked={formValues.receiveMessageEvent}
                    onChange={handleInputChange}
                  />
                  <Label
                    className="form-label font-medium-2"
                    for="receiveMessageEvent"
                  >
                    دریافت پیام های رویداد
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
export { EditUserForm };
