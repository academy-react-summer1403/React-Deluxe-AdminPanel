// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch } from "react-redux";
import { useAddNewUser } from "../../../core/services/api/Admin/handelUsers";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { validationSchemaForAddNewUser } from "../../../core/services/validation/AdminPanel";
import { useQueryClient } from "@tanstack/react-query";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const countryOptions = [
  { label: "Australia", value: "Australia" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Belarus", value: "Belarus" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
  { label: "Mexico", value: "Mexico" },
  { label: "Philippines", value: "Philippines" },
  { label: "Russia", value: "Russia" },
  { label: "South", value: "South" },
  { label: "Thailand", value: "Thailand" },
  { label: "Turkey", value: "Turkey" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const ChangeUserModal = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ defaultValues });

  //API
  const queryClient = useQueryClient();

  const { mutate: addUser } = useAddNewUser();

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      gmail: "",
      password: "",
      phoneNumber: "",
      isStudent: false,
      isTeacher: false,
    },
    validationSchema: validationSchemaForAddNewUser,
    onSubmit: (values) => {
      addUser(values, {
        onSuccess: (data) => {
          if (data.success) {
            queryClient.invalidateQueries("GetAllUsers");

            toast.success("کاربر با موفقیت اضافه شد");
            toggleSidebar();
          }
        },
        // onError: (error) => {

        // },
      });
    },
  });

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="تغییر کاربر"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-1">
          <Label className="form-label" for="firstName">
            نام<span className="text-danger">*</span>
          </Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="نام کاربر را وارد کنید"
            {...formik.getFieldProps("firstName")}
          />
          {formik.errors.firstName && (
            <div className="text-danger top-0 end-0 me-3">
              {formik.errors.firstName}
            </div>
          )}
        </div>

        <div className="mb-1">
          <Label className="form-label" for="lastName">
            نام خانوادگی<span className="text-danger">*</span>
          </Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="نام کاربر را وارد کنید"
            {...formik.getFieldProps("lastName")}
          />
          {formik.errors.lastName && (
            <div className="text-danger top-0 end-0 me-3">
              {formik.errors.lastName}
            </div>
          )}
        </div>

        <div className="mb-1">
          <Label className="form-label" for="lastName">
            جمیل<span className="text-danger">*</span>
          </Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="نام کاربر را وارد کنید"
            {...formik.getFieldProps("gmail")}
          />
          {formik.errors.gmail && (
            <div className="text-danger top-0 end-0 me-3">
              {formik.errors.gmail}
            </div>
          )}
        </div>

        <div className="mb-1">
          <Label className="form-label" for="lastName">
            شماره تلفن<span className="text-danger">*</span>
          </Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="شماره کاربر را وارد کنید"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.errors.phoneNumber && (
            <div className="text-danger top-0 end-0 me-3">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <div className="mb-1">
          <Label className="form-label" for="lastName">
            رمز<span className="text-danger">*</span>
          </Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="شماره کاربر را وارد کنید"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && (
            <div className="text-danger top-0 end-0 me-3">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="form-check mb-1">
          <Input type="checkbox" id="isStudent" name="isStudent" />
          <Label className="form-check-label" for="isStudent">
            دانش آموز{" "}
          </Label>
        </div>

        <div className="form-check mb-1">
          <Input type="checkbox" id="isStudent" name="isTeacher" />
          <Label className="form-check-label" for="isTeacher">
            معلم{" "}
          </Label>
        </div>

        {/* <div className="mb-1">
          <Label className="form-label" for="country">
            Country <span className="text-danger">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div> */}

        <Button type="submit" className="me-1" color="primary">
          افزودن{" "}
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          بستن
        </Button>
      </form>
    </Sidebar>
  );
};

export default ChangeUserModal;
