// ** React Imports
import { Fragment, useState, useEffect } from "react";

import Avatar from "@components/avatar";

import Pic from "@src/assets/images/avatars/1.png";
import Pic2 from "@src/assets/images/raty/star-on-2.png";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns"; // ** Third Party Components
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
  Send,
  Eye,
  Image,
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
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { usehandleDelete } from "./CourseHandleDelete/handleDelete";
import { useCourseGroupList } from "../../../../core/services/api/CourseGroupList";
import { CourseGroupDetailModalContent } from "./CourseGroupDetailModalContent/CourseGroupDetailModalContent";
const CourseGroupeTable = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید ...",
    number: 0,
  });
  const [show, setShow] = useState(false);

  const { data } = useCourseGroupList(
    currentPage,
    rowsPerPage,
    searchTerm,
    currentRole.value,
    currentPlan.value
  );
  // if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "انتخاب کنید..." },
    { value: "TypeName", label: "نوع دوره" },
    { value: "StatusName", label: "وضعیت دوره" },
    { value: "LevelName", label: "سطح دوره" },
    { value: "Cost", label: "قیمت" },
    { value: "LastUpdate", label: "آخرین ویرایش" },
    { value: "InsertDate", label: "تاریخ ایجاد" },
  ];

  const planOptions = [
    { value: "", label: "انتخاب کنید..." },
    { value: "DESC", label: "ترتیب نزولی" },
    { value: "ASC", label: "ترتیب صعودی" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    console.log("Per Page: ", value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    console.log("Search Value: ", val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data?.totalCount / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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

  const handleDelete = usehandleDelete();

  console.log(data);

  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const column = [
    {
      name: "نام گروه",
      minWidth: "200px",
      sortField: "title",
      cell: (data) => (
        <div className="d-flex gap-1 justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link
              className="user_name text-truncate text-body p-0"
              to={`/courseDetail/${data?.courseId}`}
            >
              <span className="fw-bolder">{data?.groupName}</span>
            </Link>
            {/* <small className="text-truncate text-muted mb-0">
              {data?.teacherName}
            </small> */}
          </div>
        </div>
      ),
    },
    {
      name: "شماره گروه",
      minWidth: "172px",
      center: true,
      sortField: "levelName",
      selector: (row) => row?.groupId,
    },
    {
      name: "ظرفیت گروه",
      minWidth: "50px",
      center: true,
      sortField: "levelName",
      selector: (row) => row.groupCapacity,
    },
    {
      name: "نام استاد",
      center: true,
      minWidth: "172px",
      sortField: "typeName",
      selector: (row) => row?.teacherName,
    },
    {
      name: "شماره استاد",
      maxWidth: "110px",
      center: true,
      sortField: "reserveCount",
      selector: (row) => row?.teacherId,
    },
    {
      name: "نام دوره",
      minWidth: "172px",
      center: true,
      sortField: "typeName",
      selector: (row) => row?.courseName,
    },
    {
      name: "ظرفیت دوره",
      minWidth: "172px",
      center: true,
      sortField: "statusName",
      selector: (row) => row?.courseCapacity,
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex">
          <Link to={`/courseGroupDetail/${row.groupId}`}>
            <div
              className="btn btn-sm"
              onClick={() => toggleModal(row.groupId)}
            >
              <Image
                className="cursor-pointer"
                size={17}
                id={`send-tooltip-${row.groupId}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`send-tooltip-${row.groupId}`}
                // className="mb-1"
              >
                رسید تراکنش
              </UncontrolledTooltip>
            </div>
          </Link>

          {/* <Modal
            isOpen={openModalId === row.groupId} // Check if this modal should be open
            toggle={() => toggleModal(row.groupId)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => toggleModal(row.groupId)}
            ></ModalHeader>
            <ModalBody className="pb-5 px-sm-5 mx-50">
              <CourseGroupDetailModalContent groupId={row.groupId} />
            </ModalBody>
          </Modal> */}

          <div className="btn btn-sm" onClick={() => handleDelete(row)}>
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف دوره
            </UncontrolledTooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نوع مرتب سازی</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">جهت مرتب سازی</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className="overflow-hidden">
        <Row className="ltr py-1 px-2">
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="rows-per-page" style={{ marginRight: "25px" }}>
                نمایش
              </label>
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: "5rem" }}
              >
                <option value="10">۱۰</option>
                <option value="15">۱۵</option>
                <option value="25">۲۵</option>
                <option value="50">۵۰</option>
                <option value="75">۷۵</option>
                <option value="100">۱۰۰</option>
              </Input>
              {/* <label htmlFor="rows-per-page">Entries</label> */}
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1 ">
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>

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
                color="success"

                onClick={toggleSidebar}
              >
                جستجو
              </Button>
            </div>
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={column}
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data?.courseGroupDtos}
          />
        </div>
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default CourseGroupeTable;
