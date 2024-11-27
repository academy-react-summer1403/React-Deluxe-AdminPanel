// ** React Imports
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  Badge,
} from "reactstrap";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Third Party Components
import * as yup from "yup";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  Edit,
  Trash,
  Settings,
  MessageSquare,
  ChevronRight,
  ChevronDown,
} from "react-feather";

import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useUserComment } from "../../../../core/services/api/UserComment";

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const recentDevicesArr = [
  {
    device: "Dell XPS 15",
    location: "United States",
    browser: "Chrome on Windows",
    activity: "10, Jan 2021 20:07",
  },
  {
    location: "Ghana",
    device: "Google Pixel 3a",
    browser: "Chrome on Android",
    activity: "11, Jan 2021 10:16",
  },
  {
    location: "Mayotte",
    device: "Apple iMac",
    browser: "Chrome on MacOS",
    activity: "11, Jan 2021 12:10",
  },
  {
    location: "Mauritania",
    device: "Apple iPhone XR",
    browser: "Chrome on iPhone",
    activity: "12, Jan 2021 8:29",
  },
];

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const AppAuthComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false);
    setShowDetailModal(false);
  };

  return (
    <Fragment>
      <h1 className="text-center mb-2 pb-50">Add Authenticator App</h1>
      <h4>Authenticator Apps</h4>
      <p>
        Using an authenticator app like Google Authenticator, Microsoft
        Authenticator, Authy, or 1Password, scan the QR code. It will generate a
        6 digit code for you to enter below.
      </p>
      <div className="d-flex justify-content-center my-2 py-50">
        <img src={qrCode} alt="QR Code" className="img-fluid" width="122" />
      </div>
      <Alert color="warning">
        <h4 className="alert-heading">ASDLKNASDA9AHS678dGhASD78AB</h4>
        <div className="alert-body fw-normal">
          If you having trouble using the QR code, select manual entry on your
          app
        </div>
      </Alert>
      <Row className="gy-1">
        <Col xs={12}>
          <Input placeholder="Enter authentication code" />
        </Col>
        <Col className="d-flex justify-content-end" xs={12}>
          <Button
            outline
            color="secondary"
            className="mt-1 me-1"
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button color="primary" className="mt-1">
            <span className="me-50">Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

const AppSMSComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false);
    setShowDetailModal(false);
  };
  return (
    <Fragment>
      <h1 className="text-center mb-2 pb-50">Add your number</h1>
      <h4>Verify Your Mobile Number for SMS</h4>
      <p>
        Enter your mobile phone number with country code and we will send you a
        verification code.
      </p>
      <Row className="gy-1 mt-1">
        <Col xs={12}>
          <Cleave
            className="form-control"
            placeholder="1 234 567 8900"
            options={{ phone: true, phoneRegionCode: "US" }}
          />
        </Col>
        <Col className="d-flex justify-content-end" xs={12}>
          <Button
            outline
            color="secondary"
            className="mt-1 me-1"
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button color="primary" className="mt-1">
            <span className="me-50">Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export const columns = [
  {
    
    minWidth: "130px",
    center:true,
    name: "نام دوره",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.courseTitle}</span>
          </div>
        </div>
      );
    },
  },
  {
   
    minWidth: "130px",
    center:true,
    name: "عنوان کامنت",
    selector: (row) => row.commentTitle,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate-1 w-1 fw-bolder">
              {row.commentTitle}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    
    center:true,
    minWidth: "130px",
    name: "متن کامنت",
    selector: (row) => row.describe,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate-1 w-1 fw-bolder">
              {row.describe}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    
    center:true,
    minWidth: "130px",
    name: "وضعیت",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">
              {row.accept ? (
                <Badge
                  color="light-success"
                  className="fs-5"
                  style={{ width: "35px", textAlign: "center" }}
                >
                  فعال
                </Badge>
              ) : (
                <Badge
                  color="light-danger"
                  className="fs-5"
                  style={{ width: "70px", textAlign: "center" }}
                >
                  غیر فعال
                </Badge>
              )}
            </span>
          </div>
        </div>
      );
    },
  },
];

const CommentTap = () => {
  // ** Hooks
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState("authApp");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  const onSubmit = (data) => {
    trigger();
    console.log(data);
  };
  const handleContinue = () => {
    setShow(false);
    setShowDetailModal(true);
  };

  const { id } = useParams();
  // getQuery("userCourses", `/Course/CommentManagment?userId=${id}`);
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["userCourses"],
  // });
  const { data, isError, isLoading } = useUserComment(id);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data?.comments}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CommentTap;
