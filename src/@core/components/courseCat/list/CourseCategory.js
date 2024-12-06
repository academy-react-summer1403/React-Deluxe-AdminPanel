// ** React Imports
import { Fragment, useState, useEffect } from "react";

import Avatar from "@components/avatar";

import Pic from "@src/assets/images/avatars/1.png";
import Pic2 from "@src/assets/images/raty/star-on-2.png";

import Logo from "@src/assets/images/logo/reactdeluxe.png";
// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";
import { DatePersianizer } from "../../../../utility/utils/DatePersianizer";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  MoreVertical,
  Trash2,
  Archive,
  Edit,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useCourseCat } from "../../../../core/services/api/CourseCat";

import CardBrowserState from "./progress";

import AddCatForm from "./AddCatForm";
import { Link } from "react-router-dom";
import { EditCatForm } from "./EditCatForm/EditCatForm";
import {DetailCatForm} from "./DetailCatForm/DetailCatForm"

const CourseCategory = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [isActive, setIsActive] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید ...",
    number: 0,
  });
  const [show, setShow] = useState(false);


  const { data, isLoading, isError } = useCourseCat(rowsPerPage);
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;


  const paginatedData =
  data &&
  data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);

    setRowsPerPage(value);
    console.log(value);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data?.length / 16);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage > 0 ? currentPage - 1 : 0} // Adjust for zero-based indexing
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-center my-2 pe-1"
        }
      />
    );
  };


  const column = [
    {
      name: " نام دسته بندی",
      sortable: true,
      width: "230px",
      sortField: "title",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
            <span className="fw-bolder">
              {data?.categoryName ? data?.categoryName : "نامشخص"}
            </span>
          </div>
        </div>
      ),
    },

    {
      name: "تاریخ بروزرسانی",
      sortable: true,
      width: "230px",
      sortField: "insertDate",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <span className="fw-bolder">
              {DatePersianizer(data?.insertDate)}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "عنوان در گوگل",
      sortable: true,
      maxWidth: "350x",
      sortField: "role",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{data?.googleTitle}</span>
            </Link>
          </div>
        </div>
      ),
    },

    {
      name: "عملیات",
      center: true,
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <div className="btn btn-sm" onClick={() => toggleModal(row?.id)}>
            <FileText
              className="cursor-pointer"
              size={17}
              id={`send-tooltip-${row.id}`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`send-tooltip-${row.id}`}
              // className="mb-1"
            >
              ویرایش
            </UncontrolledTooltip>
          </div>

          <div className="btn btn-sm" onClick={() => handleDelete(row?.id)}>
            <Edit size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              مشخصات دسته بندی
            </UncontrolledTooltip>
          </div>
          <Modal
            isOpen={openModalId === row?.id}
            toggle={() => toggleModal(row?.id)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              className="bg-transparent text-center fs-8 mt-2"
              style={{ marginRight: "330px" }}
              toggle={() => toggleModal(row?.id)}
            ></ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5">
              {openModalId === row?.id && (
                <EditCatForm
                rowId={row?.id}
                />
              )}
            </ModalBody>
          </Modal>
          <Modal
            isOpen={openModalId === row?.id}
            toggle={() => toggleModal(row?.id)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              className="bg-transparent text-center fs-8 mt-2"
              style={{ marginRight: "330px" }}
              toggle={() => toggleModal(row?.id)}
            ></ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5">
              {openModalId === row?.id && (
                <DetailCatForm
                rowId={row?.id}
                />
              )}
            </ModalBody>
          </Modal>
        </div>
      ),
    },
  ];

  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <AddCatForm />
        </ModalBody>
      </Modal>

      <Card className="overflow-hidden">
        <Row className="ltr px-2 py-1">
          <Col
            xl="6"
            // className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownMenu>
                  <DropdownItem className="w-100">
                    <Printer className="font-small-4 me-50" />
                    <span className="align-middle">Print</span>
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() => downloadCSV(store.data)}
                  >
                    <FileText className="font-small-4 me-50" />
                    <span className="align-middle">CSV</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Grid className="font-small-4 me-50" />
                    <span className="align-middle">Excel</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Copy className="font-small-4 me-50" />
                    <span className="align-middle">Copy</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Button
                className="add-new-user"
                color="primary"
                onClick={() => setShow(true)}
              >
                افزودن دسته بندی جدید
              </Button>
            </div>
          </Col>
        </Row>
        <div className="react-dataTable m-1">
          <DataTable
            noHeader
            // subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={column}

            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={paginatedData}

          />
        </div>
      </Card>

    </Fragment>
  );
};

export { CourseCategory };
