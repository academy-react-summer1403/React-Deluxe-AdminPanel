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
import { useUserList } from "../../../../core/services/api/userList";

import CardBrowserState from "./progress";

import AddUserForm from "./AddUserForm";
import { Link } from "react-router-dom";
import Male from "../../../../assets/images/avatars/Male.png";
import Female from "../../../../assets/images/avatars/Female.png";
import { useUserHandleDelete } from "./UserHandleDelete/userHandleDelete";
import AvatarGroup from "@components/avatar-group";
import NoRole from "../../../../assets/images/icons/NoRole.png";
import Student from "../../../../assets/images/avatars/Student.png"
import Teacher from "../../../../assets/images/avatars/Teacher.png"
import Admin from "../../../../assets/images/avatars/Admin.png"
const UsersList = () => {
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

  const { data, isLoading, isError } = useUserList(
    searchTerm,
    currentRole.id,
    isActive.active,
    currentPage,
    rowsPerPage
  );
  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  console.log(data);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "انتخاب کنید", id: null },
    { value: "", label: "ادمین", id: 1 },
    { value: "", label: "استاد", id: 2 },
    { value: "", label: "دانشجو", id: 5 },
  ];

  const activeOptions = [
    { value: "", label: " انتخاب کنید" },
    { value: "", label: "فعال", active: "True" },
    { value: "", label: "غیر فعال", active: "false" },
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

  const handleDelete = useUserHandleDelete();

  // const AvatarDATA = [
  //   {
  //     title: "Vinnie Mostowy",
  //     img: Logo,
  //   },
  //   {
  //     title: "Elicia Rieske",
  //     img: Logo,
  //   },
  //   {
  //     title: "Julee Rossignol",
  //     img: Logo,
  //   },
  //   {
  //     title: "Darcey Nooner",
  //     img: Logo,
  //   },
  //   {
  //     title: "Jenny Looper",
  //     img: Logo,
  //   },
  // ];

  // const roleAvatars = {
  //   Student: { title: "Student", img: "/path/to/student-avatar.png" },
  //   Teacher: { title: "Teacher", img: "/path/to/teacher-avatar.png" },
  //   Administrator: { title: "Administrator", img: "/path/to/admin-avatar.png" },
  // };

  // const AvatarGroupComponent = ({ userRoles }) => {
  //   // Convert string to an array
  //   const rolesArray = userRoles
  //     ? userRoles.split(", ").map((role) => role.trim())
  //     : [];

  //   // Generate avatar data based on roles
  //   const avatarData = rolesArray
  //     .filter((role) => roleAvatars[role])
  //     .map((role) => ({
  //       title: roleAvatars[role].title,
  //       img: roleAvatars[role].img,
  //     }));

  //   return (
  //     <AvatarGroup>
  //       {avatarData.map((avatar, index) => (
  //         <Tooltip key={index} title={avatar.title}>
  //           <Avatar src={avatar.img} alt={avatar.title} />
  //         </Tooltip>
  //       ))}
  //     </AvatarGroup>
  //   );
  // };

  const roleAvatars = {
    Student: { title: "دانشجو", img: Student },
    Teacher: { title: "استاد", img: Teacher },
    Administrator: { title: "ادمین", img: Admin },
    // Add other roles here as needed
  };

  // const dynamicAvatars = row.userRoles
  //   ? row.userRoles
  //       .split(", ")
  //       .map((role) => role.trim()) // Split roles into an array
  //       .filter((role) => roleAvatars[role]) // Keep only roles with defined avatars
  //       .map((role) => ({
  //         title: roleAvatars[role].title,
  //         img: roleAvatars[role].img,
  //       }))
  //   : [
  //       {
  //         title: "No Role Assigned",
  //         img: Logo, // Placeholder for null roles
  //       },
  //     ];

  const column = [
    {
      name: "نام کاربر",
      sortable: true,
      minWidth: "300px",
      sortField: "gmail",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <Avatar
            style={{
              backgroundColor: "transparent",
              // ...(data.gender ? "" : { width: "13%" }),
              ...(data.pictureAddress !== null &&
              data.pictureAddress !== "Not-set" &&
              data.pictureAddress.includes("http")
                ? { opacity: "1" }
                : { opacity: "0.5" }),
            }}
            img={
              data.pictureAddress !== null &&
              data.pictureAddress !== "Not-set" &&
              data.pictureAddress.includes("http")
                ? data.pictureAddress
                : data.gender
                ? Male
                : Female
            }
          />
          <div className="d-flex flex-column">
            <Link
              className="user_name text-truncate text-body  p-0"
              to={`/userdetail/${data?.id}`}
            >
              <span className="fw-bolder">{data?.fname} {data?.lname}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {data?.gmail}
            </small>
          </div>
        </div>
      ),
    },
    {
      name: "نقش",
      center: true,
      // sortable: true,
      minWidth: "172px",
      sortField: "role",
      // selector: data => data?.userRoles,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* <Avatar img={Pic2}/> */}
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            <Link
              to={`/userdetail/${data?.id}`}
              className="user_name text-truncate text-body p-1"
            >
              {/* <AvatarGroup
                data={
                  [
                    // row.userRoles == null && {
                    //   title: "KIIIIIIIIIIIIIIIIIIIII",
                    //   img: Logo,
                    // },
                    // row.userRoles.includes("Student") && {
                    //   title: "KIIIIIIIIIIIIIIIIIIIII",
                    //   img: Logo,
                    // },
                    // {
                    //   title: "Elicia Rieske",
                    //   img: Logo,
                    // },
                    // {
                    //   title: "Julee Rossignol",
                    //   img: Logo,
                    // },
                    // {
                    //   title: "Darcey Nooner",
                    //   img: Logo,
                    // },
                    // {
                    //   title: "Jenny Looper",
                    //   img: Logo,
                    // },
                  ]
                }
              /> */}
              <AvatarGroup
                data={
                  row.userRoles
                    ? row.userRoles
                        .split(", ")
                        .map((role) => role.trim()) // Split roles into an array
                        .filter((role) => roleAvatars[role]) // Keep only roles with defined avatars
                        .map((role) => ({
                          title: roleAvatars[role].title,
                          img: roleAvatars[role].img,
                        }))
                    : [
                        {
                          title: "نقشی ندارد",
                          img: NoRole, // Placeholder for null roles
                        },
                      ]
                }
              />
              {/* <span className="fw-bolder">
                {row.userRoles == "Teacher" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-info me-50"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    استاد
                  </>
                ) : row.userRoles == "Administrator" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-danger me-50"
                    >
                      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path>
                      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
                      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path>
                      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path>
                      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path>
                      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path>
                      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>
                    </svg>
                    ادمین
                  </>
                ) : row.userRoles == "Student" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-primary me-50"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    دانشجو
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-warning me-50"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    نقشی ندارد
                  </>
                )}
              </span> */}
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "درصد تکمیل پروفایل",
      sortable: true,
      minWidth: "172px",
      cell: (row) => (
        <CardBrowserState percent={row.profileCompletionPercentage} />
      ),
    },
    {
      name: "وضعیت",
      sortable: true,
      maxWidth: "150x",
      sortField: "role",
      selector: (row) => (
        <div>
          {/* {row.active == "True" ? "فعال" : "غیرفعال"}  */}
          {row.active == "True" ? (
            <Badge
              color="light-success"
              className="fs-5"
              style={{ width: "auto", textAlign: "center" }}
            >
              فعال
            </Badge>
          ) : (
            <Badge
              color="light-danger"
              className="fs-5"
              style={{ width: "auto", textAlign: "center" }}
            >
              غیر فعال
            </Badge>
          )}
        </div>
      ),
    },
    // {
    //   name: "جنسیت",
    //   sortable: true,
    //   maxWidth: "70px",
    //   sortField: "role",
    //   selector: (row) => (
    //     <div>
    //       {row.gender ? (
    //         <Avatar img={Male} style={{ backgroundColor: "transparent" }} />
    //       ) : (
    //         <Avatar
    //           img={Female}
    //           style={{ backgroundColor: "transparent" }}
    //           imgWidth={28}
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "عملیات",
      center: true,
      minWidth: "100px",
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
                جزییات کاربر
              </UncontrolledTooltip>
            </div>
          </Link>
          <div className="btn btn-sm" onClick={() => handleDelete(row?.id)}>
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف کاربر
            </UncontrolledTooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <AddUserForm />
        </ModalBody>
      </Modal>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
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
              <Label for="plan-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={activeOptions}
                value={isActive}
                onChange={(data) => {
                  setIsActive(data);
                }}
              />
            </Col>
            {/* <Col md="4">
              <Label for="status-select">مرتب سازی</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col> */}
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <Row className="ltr px-2 py-1">
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
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 ">
              <Input
                id="search-invoice"
                className=" w-100"
                type="text"
                placeholder="...جستجو"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="add-new-user"
              color="primary"
              // onClick={toggleSidebar}
            >
              جستجو
            </Button>

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
                افزودن کاربر جدید
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
            data={data?.listUser}
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

export default UsersList;
