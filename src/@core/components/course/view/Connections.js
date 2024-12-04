// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  Label,
  Button,
  UncontrolledTooltip,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

// ** Icons Imports
import {
  Check,
  X,
  ChevronDown,
  Trash2,
  Image,
  ChevronRight,
  MessageSquare,
  Settings,
} from "react-feather";

// ** Social Icon Imports
import slackIcon from "@src/assets/images/icons/social/slack.png";
import asanaIcon from "@src/assets/images/icons/social/asana.png";
import googleIcon from "@src/assets/images/icons/social/google.png";
import githubIcon from "@src/assets/images/icons/social/github.png";
import behanceIcon from "@src/assets/images/icons/social/behance.png";
import twitterIcon from "@src/assets/images/icons/social/twitter.png";
import facebookIcon from "@src/assets/images/icons/social/facebook.png";
import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";
import dribbbleIcon from "@src/assets/images/icons/social/dribbble.png";
import mailchimpIcon from "@src/assets/images/icons/social/mailchimp.png";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCoursePayments } from "../../../../core/services/api/CoursePayments";
import { FileText } from "react-feather";
import { DatePersianizer } from "../../../../utility/utils/DatePersianizer";

const connectedAccounts = [
  {
    checked: true,
    title: "Google",
    subtitle: "Calendar and contacts",
    logo: googleIcon,
  },
  {
    checked: false,
    title: "Slack",
    subtitle: "Communication",
    logo: slackIcon,
  },
  {
    checked: true,
    title: "Github",
    subtitle: "Git repositories",
    logo: githubIcon,
  },
  {
    checked: false,
    title: "Mailchimp",
    subtitle: "Email marketing service",
    logo: mailchimpIcon,
  },
  {
    checked: false,
    title: "Asana",
    subtitle: "Communication",
    logo: asanaIcon,
  },
];

// const socialAccounts = [
//   {
//     linked: false,
//     title: "درباره کاربر",
//     logo: facebookIcon,
//   },
//   {
//     linked: true,
//     title: "آدرس  ایمیل",
//     url: "https://twitter.com/pixinvent",
//     logo: twitterIcon,
//   },
//   {
//     linked: true,
//     title: "تاریخ تولد",
//     url: "https://www.linkedin.com/company/pixinvent/",
//     logo: linkedinIcon,
//   },
//   {
//     linked: false,
//     title: "آی دی کاربر",
//     logo: dribbbleIcon,
//   },
//   {
//     linked: false,
//     title: "ایمیل بازبابی",
//     logo: behanceIcon,
//   },
// ];
const Connections = () => {
  const [show, setShow] = useState(false);

  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const columns = [
    {
      minWidth: "130px",
      name: "نام دانشجو",
      selector: (row) => row.studentName,
      center: true,
    },
    {
      name: "عنوان تراکنش",
      selector: (row) => row.title,
      center: true,
    },
    {
      name: "تاریخ تراکنش",
      selector: (row) => DatePersianizer(row.peymentDate),
      center: true,
    },
    {
      name: "تاریخ کامنت",
      selector: (row) => row.paid,
      center: true,
    },
    {
      name: "وضعیت",
      selector: (row) => row.groupId,
      center: true,
      cell: (row) => {
        return row.accept ? (
          <Badge
            color="light-success"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            پرداخت شده
          </Badge>
        ) : (
          <Badge
            color="light-danger"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            پرداخت نشده
          </Badge>
        );
      },
    },
    {
      name: "اقدامات",
      // selector: (row) => row.groupId,
      center: true,
      cell: (row) => {
        return (
          <div className="column-action d-flex">
            <div className="btn btn-sm" onClick={() => toggleModal(row.id)}>
              <Image
                className="cursor-pointer"
                size={17}
                id={`send-tooltip-${row.id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`send-tooltip-${row.id}`}
                // className="mb-1"
              >
                رسید تراکنش
              </UncontrolledTooltip>
            </div>
            <Modal
              isOpen={openModalId === row.id} // Check if this modal should be open
              toggle={() => toggleModal(row.id)}
              className="modal-dialog-centered modal-lg"
            >
              <ModalHeader
                className="bg-transparent"
                toggle={() => toggleModal(row.id)}
              ></ModalHeader>
              <ModalBody className="pb-5 px-sm-5 mx-50">
                <div className="text-center mb-2">
                  <h1 className="mb-1">رسید تراکنش</h1>
                </div>
                <img
                  src={`${row.paymentInvoiceImage}`}
                  alt="رسید تراکنش"
                  className="img-fluid img-container"
                  style={{
                    width: "675px",
                    height: "400px",
                    borderRadius: "10px",
                  }}
                ></img>
              </ModalBody>
            </Modal>
          </div>
        );
      },
    },
  ];

  const { id } = useParams();

  const { data } = useCoursePayments(id);

  return (
    <Fragment>
      <Card>
        <div
          className="react-dataTable user-view-account-projects"
          style={{ maxHeight: "750px", overflowY: "auto" }}
        >
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={data}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Connections;
