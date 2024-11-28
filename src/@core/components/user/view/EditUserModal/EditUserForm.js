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

const EditUserForm = () => {
  const formRef = useRef(null);

  // const mutation = useAddUser();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(formRef.current);
  //   const formValues = Object.fromEntries(formData.entries());
  //   console.log(formValues);
  //   const userToast = toast.loading("درحال ساختن کاربر");
  //   try {
  //     await mutation.mutateAsync(formValues);
  //     toast.success("کاربر با موفقیت ساخته شد!", { id: userToast });
  //   } catch (error) {
  //     toast.error("ساخت کاربر با مشکل مواجه شد:", { id: userToast });
  //   }
  // };

  const [formValues, setFormValues] = useState({
    firstName: "John",
    lastName: "Doe",
    userName: "Johny",
    phoneNumber: "09112223344",
    nationalCode: "2081244444",
    userActive: true,
    userAbout: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    birthDate: "2024-11-19",
    userGender: false,
    userEmail: "JohnKocholo@gmail.com",
    userRecoveryEmail: "DoeKocholo@gmail.com",
    userTelegram: "https://telegram.me/shayan",
    userLinkedIn: "https://www.linkedin.com/in/shayan",
    userAddress: "bobal vertical city amel",
    userLong: "33.3434",
    userLat: "45.3434",
    
  });

  useEffect(() => {
    setTimeout(() => {
      setFormValues({ firstName: "Jane", lastName: "Smith" });
    }, 3000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log("Form Values:", formValues);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  const activeOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  const GenderOptions = [
    { value: true, label: "مرد" },
    { value: false, label: "زن" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">ویرایش اطلاعات کاربر👤</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="firstName">
                نام
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="نام"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="4" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="lastName">
                نام خانوادگی
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="نام خانوادگی"
                value={formValues.lastName}
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
              <Label className="form-label" for="userActive">
                وضعیت
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="userActive"
                className="react-select"
                classNamePrefix="select"
                options={activeOptions}
                name="userActive"
                value={formValues.userActive} // Set initial value
                onChange={handleInputChange}
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
              <Label className="form-label" for="birthDate">
                تاریخ تولد
              </Label>
              <Input
                type="date"
                name="birthDate"
                id="birthDate"
                placeholder="29 اردیبهشت 1403 - 5 خرداد 1403"
                value={formValues.birthDate}
                onChange={handleInputChange}
                // className=" py-2 px-3 text-xs w-52 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg outline-none border-none"
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userGender">
                جنسیت
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                id="userGender"
                className="react-select"
                classNamePrefix="select"
                options={GenderOptions}
                name="userGender"
                value={formValues.userGender} // Set initial value
                onChange={handleInputChange}
                // defaultValue={countryOptions[0]}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userEmail">
                ایمیل
              </Label>
              <Input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="ایمیل"
                value={formValues.userEmail}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userRecoveryEmail">
                ایمیل بازیابی
              </Label>
              <Input
                type="text"
                name="userRecoveryEmail"
                id="userRecoveryEmail"
                placeholder="ایمیل بازیابی"
                value={formValues.userRecoveryEmail}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userTelegram">
                لینک تلگرام
              </Label>
              <Input
                type="text"
                name="userTelegram"
                id="userTelegram"
                placeholder="لینک تلگرام"
                value={formValues.userTelegram}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userLinkedIn">
                لینک لینکدین
              </Label>
              <Input
                type="text"
                name="userLinkedIn"
                id="userLinkedIn"
                placeholder="لینک لینکدین"
                value={formValues.userLinkedIn}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userAddress">
                آدرس کاربر
              </Label>
              <Input
                type="textarea"
                name="userAddress"
                id="userAddress"
                placeholder="آدرس کاربر"
                value={formValues.userAddress}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userLong">
                طول جغرافیایی
              </Label>
              <Input
                type="text"
                name="userLong"
                id="userLong"
                placeholder="طول جغرافیایی"
                value={formValues.userLong}
                onChange={handleInputChange}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="userLat">
                عرض جغرافیایی
              </Label>
              <Input
                type="text"
                name="userLat"
                id="userLat"
                placeholder="عرض جغرافیایی"
                value={formValues.userLat}
                onChange={handleInputChange}
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
export { EditUserForm };
