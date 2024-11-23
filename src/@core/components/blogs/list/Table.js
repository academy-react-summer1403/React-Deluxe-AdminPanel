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
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { useBlogs } from "../../../../core/services/api/blog";
import { FullPageLoading } from "../../../../assets/Loadings/FullPageLoading/FullPageLoading";
const UsersList = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  const { data, isLoading, isError } = useBlogs(
    searchTerm,
    currentRole.id,
    currentPage,
    rowsPerPage
  );

  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  console.log(currentRole);

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
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     perPage: rowsPerPage,
    //     page: page.selected + 1,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //     currentPlan: currentPlan.value,
    //   })
    // );
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     perPage: value,
    //     page: currentPage,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //   })
    // );
    setRowsPerPage(value);
    console.log(value);
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
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  const column = [
    {
      name: "نویسنده",
      sortable: true,
      minWidth: "130px",
      sortField: "title",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1 px-1">
          <Avatar img={data.currentImageAddressTumb ?? Logo} />
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column ">
            <Link className="user_name text-truncate text-body  p-0 ">
              <span className="fw-bolder">{data?.addUserFullName}</span>
            </Link>
          </div>
        </div>
      ),
    },

    {
      name: " عنوان خبر",
      sortable: true,
      minWidth: "130px",
      sortField: "typeName",
      selector: (row) => row.miniDescribe,
    },
    {
      name: "دسته بندی خبر",
      sortable: true,
      minWidth: "100px",
      sortField: "role",
      selector: (row) => row.title,
    },
    // {
    //   name: "توضیحات کوتاه",
    //   sortable: true,
    //   minWidth: "130px",
    //   sortField: "role",
    //   selector: (row) => row.miniDescribe,
    // },
    {
      name: " وضعیت",
      sortable: true,
      minWidth: "152px",
      sortField: "role",
      selector: (row) => row.isActive,
    },
    {
      name: "اقدام",
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
                to={`/apps/user/view/${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
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
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden ">
        <Row className="ltr mt-2">
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-300  ml-20 ">
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
              {/* <Input
                className="mx-50 " 
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: "20rem"}}
              >
                <option value="10">فعال</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input> */}
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
                value={searchTerm}
                placeholder="جستجو"
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
        <div className="react-dataTable mt-5">
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
            data={data?.news}
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
