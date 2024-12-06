// ** React Imports
import { Fragment, useState } from "react";
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
} from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useBuilding } from "../../../../core/services/api/Building";
import { DetailBuilding } from "./DetailBuilding/DetailBuilding";
import CardBrowserState from "./progress";

import AddCatForm from "./AddCatForm";
import { Link } from "react-router-dom";
import { DashboardSquareEditIcon } from "hugeicons-react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BuildingList = () => {
  // ** States
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

  const { data, isLoading, isError } = useBuilding(rowsPerPage);
  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;


  const paginatedData =
  data &&
  data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  

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
    const count = Math.ceil(data?.length / 16 );

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
      name: " نام  ساختمان",
      sortable: true,
      minWidth: "140px",
      sortField: "title",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
            <span className="fw-bolder">
              {data?.buildingName ? data?.buildingName : "نامشخص"}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: " طبقه ",
      sortable: true,
      center: true,
      maxWidth: "20x",
      sortField: "role",
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{data?.floor}</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "عملیات",
      center: true,
      minWidth: "150px",
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
                جزییات
              </UncontrolledTooltip>
            </div>
          {/* <div className="btn btn-sm" onClick={() => toggleModals(row?.id)}>
            <DashboardSquareEditIcon
              size={17}
              className=""
              id={`pw-tooltip-${row.id}`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              جزییات
            </UncontrolledTooltip>
          </div> */}
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
    <DetailBuilding
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


  const GetCoordinates = ({ setCoords, setCortinate }) => {
    useMapEvents({
      click: (e) => {
        console.log(e)
        // const { lat, lng } = e.latlng;
        // setCoords({ lat, lng });
        // setCortinate({ lat, lng });
      },
    });

    return null;
  };

  const [coords, setCoords] = useState({
    // lat: data?.latitude,
    // lng: data?.longitude,
    lat: 51.505,
    lng: -0.1,
  });

  const markerData = data?.map((option) => ({
    // value: option?.longitude,
    // label: option?.latitude,
    id: option.id,
    position: [option?.latitude, option?.longitude],
    name: option?.buildingName,
  }));
  console.log(markerData)

  return (
    <div className="d-flex">
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <AddCatForm />
        </ModalBody>
      </Modal>

      <MapContainer
        // center={coords}
        center={[ 51, 0]}
        zoom={13}
        style={{ height: "100vh", width: "70%", zIndex: "0" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GetCoordinates
          setCoords={setCoords}
          // setCortinate={setCortinate}
        />

        {/* <Marker position={coords}>
            <Popup>A popup for the marker.</Popup>
          </Marker> */}
        {
        // markerData &&
          markerData?.map((marker) => (
            <Marker key={marker?.id} position={marker?.position}>
              <Popup>{marker?.name}</Popup>
            </Marker>
          ))}
      </MapContainer>

      <Card className="overflow-hidden" style={{ width: "30%" }}>
        <Row className="ltr px-2 py-1 d-flex justify-content-center">
          <Col xl="6" className="w-75">
            <div className="d-flex align-items-center justify-content-center table-header-actions">
              {/* <UncontrolledDropdown className="me-1">
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
              </UncontrolledDropdown> */}

              <Button
                className="add-new-user"
                color="primary"
                // onClick={toggleSidebar}
                onClick={() => setShow(true)}
              >
                افزودن ساختمان جدید
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
      

    </div>
  );
};

export { BuildingList };
