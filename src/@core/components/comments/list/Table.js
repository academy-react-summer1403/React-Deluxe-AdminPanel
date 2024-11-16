// ** React Imports
import { Fragment, useState, useEffect } from "react";

import Avatar from "@components/avatar";

import Pic from "@src/assets/images/avatars/1.png";
import Pic2 from "@src/assets/images/raty/star-on-2.png";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
// import { getAllData, getData } from '../store'
// import { useDispatch, useSelector } from 'react-redux'

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
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
const Comments = () => {

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

  getQuery("comments", "/Course/CommentManagment");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments"],
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>کوفت</div>;
 
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
   
  };

  // const Data = [
  //   {
  //     fname: "ghonche",
  //     lname: "ataee",
  //     Email: "ghonche.ataee@gmail.com",
  //     teacher: "shayan",
  //   },
  //   {
  //     fname: "ghonche",
  //     lname: "ataee",
  //     Email: "ghonche.ataee@gmail.com",
  //     teacher: "shayan",
  //   },
  //   {
  //     fname: "ghonche",
  //     lname: "ataee",
  //     Email: "ghonche.ataee@gmail.com",
  //     teacher: "shayan",
  //   },
  //   {
  //     fname: "ghonche",
  //     lname: "ataee",
  //     Email: "ghonche.ataee@gmail.com",
  //     teacher: "shayan",
  //   },
  // ];

  const column = [
    {
      name: " کاربر",
      sortable: true,
      minWidth: "300px",
      sortField: "title",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar img={Pic} />
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body  p-0">
              <span className="fw-bolder">{data?.userFullName}</span>
            </Link>
          
          </div>
        </div>
      ),
    },

    {
      name: " عنوان کامنت",
      sortable: true,
      minWidth: "172px",
      sortField: "typeName",
      selector: (row) => row.courseTitle,
      // cell: row => renderRole(row)
    },
    {
      name: "نمایش کامنت",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.describe,
      // cell: row => renderRole(row)
    },
    {
      name: "وضعیت",
      sortable: true,
      minWidth: "172px",
      sortField: "accept",
      selector: (row) =><div> {row.accept ? "تایید شده" : "تایید نشده"}</div>
      // cell: row => renderRole(row)
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                // to={`/apps/user/view/${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">رد کردن</span>
              </DropdownItem>
             
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => {
                //   e.preventDefault()
                //   store.dispatch(deleteUser(row.id))
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => {
                //   e.preventDefault()
                //   store.dispatch(deleteUser(row.id))
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">پاسخ</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card>
      
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">وضعیت</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    })
                  );
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
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                    })
                  );
                }}
              />
            </Col>
           
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <Row className="ltr">
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="rows-per-page" style={{ marginRight: "20px" }}>نمایش</label>
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: "5rem" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
         
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                placeholder="جستجو"

                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
              />
                 <Button
                className="add-new-user"
                color="primary"
                onClick={toggleSidebar}
              >
                جستجو
              </Button>
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
            // paginationServer
            columns={column}
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={CustomPagination}
            data={data?.comments}
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

export default Comments;
