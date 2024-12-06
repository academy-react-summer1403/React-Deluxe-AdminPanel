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
import { useBuilding } from "../../../../core/services/api/Building";

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

  const { data, isLoading, isError } = useBuilding(rowsPerPage);
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
    //  {
    //       name: " عرض جغرافیایی ",
    //       sortable: true,
    //       maxWidth: "350x",
    //       sortField: "role",
    //       cell: (data) => (
    //         <div className="d-flex justify-content-left align-items-center gap-1">
    //           {/* <Avatar img={Logo} /> */}
    //           <div className="d-flex flex-column">
    //             <Link className="user_name text-truncate text-body  p-0">
    //               <span className="fw-bolder">{data?.latitude.slice(0, 10)}</span>
    //             </Link>
    //           </div>
    //         </div>
    //       ),
    //     },
    // {
    //   name: "  طول جغرافیایی",
    //   sortable: true,
    //   maxWidth: "350x",
    //   sortField: "role",
    //   cell: (data) => (
    //     <div className="d-flex justify-content-left align-items-center gap-1">
    //       <div className="d-flex flex-column">
    //         <Link className="user_name text-truncate text-body  p-0">
    //           <span className="fw-bolder">{data?.longitude.slice(0, 10)}</span>
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: "عملیات",
      center: true,
      minWidth: "150px",
      cell: (row) => (
        <div className="column-action">
          <Link
            className="user_name text-truncate text-body p-0"
            to={`/userdetail/${row?.id}`}
          >
            <div className="btn btn-sm">
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
          </Link>
          <div className="btn btn-sm" onClick={() => handleDelete(row?.id)}>
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
          </div>
        </div>
      ),
    },
  ];

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

  // const markerData = [
  //   { id: 1, position: [51.505, -0.09], name: "Marker 1" },
  //   { id: 2, position: [51.515, -0.1], name: "Marker 2" },
  //   { id: 3, position: [51.525, -0.08], name: "Marker 3" },
  // ];

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
            data={data}
          />
        </div>
      </Card>
      

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </div>
  );
};

export { BuildingList };
