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
import { useTerms } from "../../../../core/services/api/Term";


import CardBrowserState from "./progress";

import AddCatForm from "./AddCatForm";
import { Link } from "react-router-dom";
import { DashboardSquareEditIcon } from "hugeicons-react";
import { TermEdit } from "./EditTerm/EditTerms";
// import { TermEdit } from "./EditTerm/EditTerms";
// import { EditTerms } from "./EditTerm/EditTerms";


const Term = () => {
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

  const { data, isLoading, isError } = useTerms(rowsPerPage);
  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  console.log(data);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  // const handleDelete = useUserHandleDelete();

  const column = [
    {
      name: "ترم",
      sortable: true,
      width: "230px",
      sortField: "title",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
            <span className="fw-bolder">
              {data?.termName ? data?.termName : "نامشخص"}
            </span>
          </div>
        </div>
      ),
    },

    {
      name: "  تاریخ شروع",
      sortable: true,
      width: "150px",
      sortField: "insertDate",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <span className="fw-bolder">
              {DatePersianizer(data?.startDate)}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "   تاریخ پایان ",
      sortable: true,
      maxWidth: "150x",
      center:true,
      sortField: "role",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{DatePersianizer(data?.endDate)}
              </span>
            </Link>
          </div>
        </div>
      ),
    },
 {
      name: " وضعیت ",
      sortable: true,
      maxWidth: "250x",
      center:true,
      sortField: "role",
      cell: (data) => (
        <div>
        {" "}
        {data.expire ? (
          <Badge
            color="light-success"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
             درحال برگزاری
          </Badge>
        ) : (
          <Badge
            color="light-danger"
            className="fs-5"
            style={{ width: "auto", textAlign: "center" }}
          >
            {" "}
             منقضی شده{" "}
          </Badge>
        )}
      </div>
      ),
    },
  
    {
      name: "عملیات",
      center: true,
      minWidth: "200px",
      center:true,
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
            <DashboardSquareEditIcon size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
                جزییات
            </UncontrolledTooltip>
          </div>
          <Modal

            isOpen={openModalId === row?.id}
            toggle={() => toggleModal(row?.id)}
            style={{width:"450px"}}
            className="modal-dialog-centered modal-lg d-flex"
            
          >
            <ModalHeader
              className="bg-transparent text-center fs-8 mt-2"
              style={{ marginRight: "330px" }}
              toggle={() => toggleModal(row?.id)}
            ></ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5 d-flex"
        style={{width:"450px"}}
            
            >
              {openModalId === row?.id && (
                <TermEdit
                rowId={row?.id}
               
                />
              )}
            </ModalBody>
          </Modal>
        </div>
      ),
    },
  ];

  const [openModalId, setOpenModalId] = useState(null); 

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        style={{width:"450px"}}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <AddCatForm />
        </ModalBody>
      </Modal>

      <Card className="overflow-hidden">
        <Row className="ltr px-2 py-1">
          {/* <Col xl="6" className="d-flex align-items-center p-0">
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
            </div>
          </Col> */}
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
                // onClick={toggleSidebar}
                onClick={() => setShow(true)}
              >
                افزودن  ترم جدید
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
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data}

            // subHeaderComponent={
            //   <CustomHeader
            //     store={store}
            //     searchTerm={searchTerm}
            //     rowsPerPage={rowsPerPage}
            //     handleFilter={handleFilter}
            //     handlePerPage={handlePerPage}
            //     toggleSidebar={toggleSidebar}
            //   />
            // }
          />
        </div>
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export { Term };
