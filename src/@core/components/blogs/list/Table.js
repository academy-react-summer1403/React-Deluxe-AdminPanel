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
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { useBlogs } from "../../../../core/services/api/blog";
import { FullPageLoading } from "../../../../assets/Loadings/FullPageLoading/FullPageLoading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useActiveDeactiveCourse } from "../../../../core/services/api/ActiveDeactiveCourse";
import { useActiveDeactiveBlog } from "../../../../core/services/api/ActiveDeactiveBlogs";
import { CancelCircleIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { useQueryClient } from "@tanstack/react-query";
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
    label: "انتخاب کنید...",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "انتخاب کنید...",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید...",
  });

  const { data, isLoading, isError } = useBlogs(
    searchTerm,
    currentPage,
    rowsPerPage,
    currentRole?.value,
    currentPlan?.value,
    currentStatus?.value
  );

  // if (isLoading) return <FullPageLoading />;
  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  console.log(currentRole);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const roleOptions = [
    // { value: "", label: "انتخاب کنید..." },
    { value: "InsertDate", label: "تاریخ ایجاد" },
    // { value: "title", label: "تیتر خبر" },
    // { value: "TypeName", label: "نوع دوره" },
    // { value: "StatusName", label: "وضعیت دوره" },
    // { value: "LevelName", label: "سطح دوره" },
    // { value: "Cost", label: "قیمت" },
    // { value: "LastUpdate", label: "آخرین ویرایش" },
  ];

  const planOptions = [
    // { value: "", label: "انتخاب کنید..." },
    { value: "DESC", label: "ترتیب نزولی" },
    { value: "ASC", label: "ترتیب صعودی" },
  ];

  const statusOptions = [
    // { value: "", label: "انتخاب کنید..." },
    { value: true, label: "فعال" },
    { value: false, label: "غیر فعال" },
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

  const MySwal = withReactContent(Swal);

  // const mutation = useDeleteCourse();

  const handleDelete = async (row) => {
    console.log(row);
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          await mutation.mutateAsync({
            CourseId: row.courseId,
            isActive: row.isActive,
          });
        } catch (error) {
          console.log(error);
        }
        MySwal.fire({
          icon: "success",
          title: "حذف شد !",
          text: "عملیات با موفقیت انجام شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "عملیات لغو شد",
          text: "لغو",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const mutationActivation = useActiveDeactiveBlog();

  const queryClient = useQueryClient();

  const handleActication = async (row) => {
    const formData = new FormData();
    formData.append("Active", !row.isActive);
    formData.append("Id", row.id);
    console.log(row);
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          await mutationActivation.mutateAsync(formData);
          MySwal.fire({
            icon: "success",
            title: row?.isActive ? "غیرفعال سازی" : "فعال سازی",
            text: "عملیات با موفقیت انجام شد",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          queryClient.invalidateQueries("Blogs");
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "حذف نشد !",
            text: "عملیات با موفقیت انجام نشد",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
        // MySwal.fire({
        //   icon: "success",
        //   title: "حذف شد !",
        //   text: "عملیات با موفقیت انجام شد",
        //   customClass: {
        //     confirmButton: "btn btn-success",
        //   },
        // });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "عملیات لغو شد!",
          text: "لغو",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const column = [
    {
      name: "عنوان خبر",
      sortable: true,
      // center: true,
      maxWidth: "200px",
      sortField: "title",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1 px-1">
          <Avatar
            img={
              data.currentImageAddressTumb !== null &&
              data.currentImageAddressTumb !== "Not-set" &&
              data.currentImageAddressTumb.includes("http")
                ? data.currentImageAddressTumb
                : Logo
            }
          />
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column ">
            <Link
              className="user_name text-truncate text-body p-0"
              to={`/blogsDetail/${data?.id}`}
            >
              <span className="fw-bolder">{data?.title}</span>
            </Link>
          </div>
        </div>
      ),
    },

    {
      name: "نویسنده",
      sortable: true,
      center: true,
      maxWidth: "300px",
      sortField: "role",
      selector: (row) => row.addUserFullName,
    },
    {
      name: "توضیحات خبر",
      center: true,
      maxWidth: "500px",
      sortField: "typeName",
      selector: (row) => row.miniDescribe,
    },
    {
      name: " وضعیت",
      sortable: true,
      maxWidth: "120px",
      sortField: "role",
      selector: (row) =>
        row.isActive ? (
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
        ),
    },
    {
      name: "اقدام",
      center: true,
      maxWidth: "100px",
      style: {
        textAlign: "center", // Centers the text horizontally
        verticalAlign: "middle", // Centers the text vertically
      },
      cell: (row) => (
        <div className="column-action d-flex">
          <Link
            className="user_name text-truncate text-body p-0"
            to={`/blogsDetail/${row?.id}`}
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
                جزئیات مقاله
              </UncontrolledTooltip>
            </div>
          </Link>
          <div className="btn btn-sm" onClick={() => handleActication(row)}>
            {row?.isActive ? (
              <CancelCircleIcon
                size={20}
                color={"#ff0000"}
                id="ActiveDeactive"
              />
            ) : (
              <CheckmarkCircle02Icon
                size={20}
                color={"#00cf13"}
                id="ActiveDeactive"
              />
            )}
            <UncontrolledTooltip placement="top" target={`ActiveDeactive`}>
              {row?.isActive ? "غیرفعال سازی" : "فعال سازی"}
            </UncontrolledTooltip>
          </div>
          <div className="btn btn-sm" onClick={() => handleDelete(row)}>
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف مقاله
            </UncontrolledTooltip>
          </div>
          {/* <UncontrolledDropdown>
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
          </UncontrolledDropdown> */}
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">وضعیت</Label>
              <Select
                isClearable={true}
                value={currentStatus}
                options={statusOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
                // defaultValue={{
                //   value: "",
                //   label: "انتخاب کنید...",
                // }}
              />
            </Col>
            <Col md="4">
              <Label for="role-select">نوع مرتب سازی</Label>
              <Select
                isClearable={true}
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
                isClearable={true}
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
      </Card>

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
