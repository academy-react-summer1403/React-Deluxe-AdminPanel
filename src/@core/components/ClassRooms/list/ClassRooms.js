// ** React Imports
import { Fragment, useState } from "react";
import { DatePersianizer } from "../../../../utility/utils/DatePersianizer";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

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
import { useClassRooms } from "../../../../core/services/api/ClassRooms";
import AddCatForm from "./AddCatForm";


import { Link } from "react-router-dom";
import { LicenseIcon  } from "hugeicons-react";
import { EditClassRooms } from "./EditClassRoom/EditClass";
import { DetailClassRoom } from "./DetailClassRoom/DetailClassRoom";


const ClassRooms = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
 
  const [show, setShow] = useState(false);

  const { data, isLoading, isError } = useClassRooms(rowsPerPage);
  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  // Pagination-Static
  const paginatedData =
  data &&
  data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

 
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data?.length / 10);

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


  const column = [
    {
      name: "نام کلاس",
      sortable: true,
      width: "230px",
      sortField: "title",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
            <span className="fw-bolder">
              {data?.classRoomName ? data?.classRoomName : "نامشخص"}
            </span>
          </div>
        </div>
      ),
    },

    {
      name: "تاریخ  برگزاری",
      sortable: true,
      width: "150px",
      center:true,
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
      name: " ظرفیت ",
      sortable: true,
      width: "100x",
      center:true,
      sortField: "role",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{data?.capacity}</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "نام ساختمان",
      sortable: true,
      center:true,

      maxWidth: "350x",
      sortField: "role",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{data?.buildingName}</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "عملیات",
      center: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="column-action">
            <div className="btn btn-sm"  onClick={() => toggleModal(row?.id)}>
              <FileText
                className="cursor-pointer"
                size={17}
                id={`send-tooltip-${row.id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`send-tooltip-${row.id}`
              }
              >
                ویرایش
              </UncontrolledTooltip>
            </div>
          <div className="btn btn-sm" onClick={() => toggleModals(row?.id)}>
            <LicenseIcon  size={17} className="" id={`pw-tooltip-${row.id}`} />
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
                <EditClassRooms
                rowId={row?.id}
               
                />
              )}
            </ModalBody>
          </Modal>
          <Modal

isOpen={openModalId2 === row?.id}
toggle={() => toggleModals(row?.id)}
style={{width:"450px"}}
className="modal-dialog-centered modal-lg d-flex"

>
<ModalHeader
  className="bg-transparent text-center fs-8 mt-2"
  style={{ marginRight: "330px" }}
  toggle={() => toggleModals(row?.id)}
></ModalHeader>
<ModalBody className="px-sm-5 pt-50 pb-5 d-flex"
style={{width:"450px"}}

>
  {openModalId2 === row?.id && (
    <DetailClassRoom
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
  const [openModalId2, setOpenModalId2] = useState(null); 

  const toggleModals = (id) => {
    setOpenModalId2((prevId) => (prevId === id ? null : id));
  };


  return (
    <Fragment>
   <div className="d-flex gap-2">

   <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg" style={{width:"450px"}}
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5 d-flex gap-5">
          <AddCatForm />
        </ModalBody>
      </Modal>

   </div>
      <Card className="overflow-hidden">
        <Row className="ltr px-2 py-1">
          <Col
            xl="6"
            // className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center table-header-actions gap-3">
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
                افزودن  کلاس جدید
              </Button>
  
            </div>
          </Col>
        </Row>
        <div className="react-dataTable m-1">
          <DataTable
            noHeader
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

export { ClassRooms };
