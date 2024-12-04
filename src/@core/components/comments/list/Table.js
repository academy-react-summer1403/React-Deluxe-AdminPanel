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
  EyeOff,
  Eye,
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
  ModalHeader,
  Modal,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { useComments } from "../../../../core/services/api/Comments";
import { ReplyModal } from "../../course/view/ReplyModal/ReplyModal";
import {
  AddCircleHalfDotIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Delete01Icon,
} from "hugeicons-react";
import toast from "react-hot-toast";
import { useAcceptComment } from "../../../../core/services/api/AcceptComment";
import { useRejectComment } from "../../../../core/services/api/RejectComment";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCommentModal } from "../../user/view/DeleteCommentModal/DeleteCommentModal";
import { AddModal } from "./AddModal/AddModal";

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

  const { data } = useComments(
    searchTerm,
    currentRole.id,
    currentPage,
    rowsPerPage
  );

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "تایید شده", id: true },
    { value: "", label: "تایید نشده", id: false },
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
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
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
  };

  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const [openReplyModalId, setOpenReplyModalId] = useState(null); // Track which modal is open

  const toggleReplyModal = (id) => {
    setOpenReplyModalId((prevId) => (prevId === id ? null : id));
  };

  const queryClient = useQueryClient();

  const mutation = useAcceptComment();

  const handleAccept = async (commentId) => {
    const userToast = toast.loading("درحال تایید کامنت");
    try {
      await mutation.mutateAsync(commentId);
      toast.success("تایید کامنت با موفقیت شد!", { id: userToast });
      queryClient.invalidateQueries("UserComment");
    } catch (error) {
      toast.error(
        `تایید کامنت با مشکل مواجه شد:,
        ${
          error.response.data.ErrorMessage
            ? error.response.data.ErrorMessage
            : "خطای تعریف نشده"
        }`,
        { id: userToast }
      );
      console.log(error);
    }
  };

  const rejectMutation = useRejectComment();

  const handleReject = async (commentId) => {
    const userToast = toast.loading("درحال رد کردن کامنت");
    try {
      await rejectMutation.mutateAsync(commentId);
      toast.success("رد کردن کامنت با موفقیت شد!", { id: userToast });
      queryClient.invalidateQueries("UserComment");
    } catch (error) {
      toast.error(
        `رد کردن کامنت با مشکل مواجه شد:,
        ${
          error.response.data.ErrorMessage
            ? error.response.data.ErrorMessage
            : "خطای تعریف نشده"
        }`,
        { id: userToast }
      );
      console.log(error);
    }
  };

  const handleDelete = useDeleteCommentModal();

  const column = [
    {
      name: "کاربر",
      sortable: true,
      minWidth: "190px",
      sortField: "title",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <Avatar img={Logo} />
          <div className="d-flex flex-column">
            <Link
              className="user_name text-truncate text-body p-0"
              style={{ width: "180px" }}
            >
              <span className="fw-bolder">{data?.userFullName}</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "  نام دوره",
      minWidth: "172px",
      center: true,
      sortField: "typeName",
      selector: (row) => row.courseTitle,
      // cell: row => renderRole(row)
    },
    {
      name: "عنوان کامنت",
      center: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.commentTitle,
    },
    {
      name: "توضیحات کامنت",
      center: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.describe,
    },
    {
      name: "وضعیت",
      center: true,
      sortable: true,
      center:true,
      minWidth: "172px",
      sortField: "accept",
      selector: (row) => (
        <div>
          {" "}
          {row.accept ? (
            <Badge
              color="light-success"
              className="fs-5"
              style={{ width: "auto", textAlign: "center" }}
            >
              تایید شده
            </Badge>
          ) : (
            <Badge
              color="light-danger"
              className="fs-5"
              style={{ width: "auto", textAlign: "center" }}
            >
              {" "}
              تایید نشده{" "}
            </Badge>
          )}
        </div>
      ),
      // cell: row => renderRole(row)
    },
    {
      name: "اقدامات",
      center: true,
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action d-flex justify-content-center">
          <div className="btn btn-sm">
            {row.replyCount > 0 ? (
              <div onClick={() => toggleModal(row.commentId)}>
                <Eye size={17} id={`eye-tooltip-${row.commentId}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.commentId}`}
                >
                  مشاهده پاسخ
                </UncontrolledTooltip>
              </div>
            ) : (
              <>
                <EyeOff size={17} id={`eye-tooltip-${row.commentId}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.commentId}`}
                >
                  پاسخی نیست
                </UncontrolledTooltip>
              </>
            )}
          </div>
          <div className="column-action d-flex">
            <div
              className="btn btn-sm"
              onClick={() => toggleReplyModal(row.commentId)}
            >
              <AddCircleHalfDotIcon
                size={20}
                color={"#0075ff"}
                id={"AddComment"}
              />
              <UncontrolledTooltip
                placement="top"
                target={`AddComment`}
                // className="mb-1"
              >
                پاسخ
              </UncontrolledTooltip>
            </div>
          </div>
          <div className="column-action d-flex">
            {!row.accept ? (
              <div
                className="btn btn-sm"
                onClick={() => handleAccept(row.commentId)}
              >
                <CheckmarkCircle02Icon
                  color={"#00cf13"}
                  size={20}
                  id={"AcceptComment"}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`AcceptComment`}
                  // className="mb-1"
                >
                  تایید
                </UncontrolledTooltip>
              </div>
            ) : (
              <div
                className="btn btn-sm"
                onClick={() => handleReject(row.commentId)}
              >
                <CancelCircleIcon
                  color={"#ffc300"}
                  size={20}
                  id={"RejectComment"}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`RejectComment`}
                  // className="mb-1"
                >
                  رد کردن
                </UncontrolledTooltip>
              </div>
            )}
            <div
              className="btn btn-sm"
              onClick={() => handleDelete(row.commentId)}
            >
              <Delete01Icon color={"#ff0000"} size={18} id={"CancelComment"} />
              <UncontrolledTooltip placement="top" target={`CancelComment`}>
                حذف
              </UncontrolledTooltip>
            </div>
          </div>
          {/* <UncontrolledDropdown>
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
          </UncontrolledDropdown> */}
          {/* REPLY COMMENT MODAL */}
          <Modal
            isOpen={openModalId === row.commentId}
            toggle={() => toggleModal(row.commentId)}
            className="modal-dialog-centered modal-xl"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => toggleModal(row.commentId)}
            >
              <div className="mb-2">
                <h1 className="mb-1">
                  <span className="fs-5">پاسخ ها به کامنت</span>{" "}
                  {row.commentTitle}
                </h1>
              </div>
            </ModalHeader>
            {openModalId === row.commentId && (
              <ReplyModal
                // toggleModal={(value) => toggleModal(value)}
                // data={data}
                // replyColumns={replyColumns}
                rowId={row.commentId}
                courseId={row.courseId}
                // openModalId={openModalId}
              />
            )}
          </Modal>
          {/* ADD COMMENT MODAL */}
          {/* DIDNT REQUIRE THE COMPLEX OPENING SYSTEM MADE OF openReplyModalId AND toggleReplyModal CAUSE IT DIDNT HAD ANY API CALLS INSIDE THE MODAL BUT EH HERE WE ARE ¯\_(ツ)_/¯ */}
          <Modal
            isOpen={openReplyModalId === row.commentId}
            toggle={() => toggleReplyModal(row.commentId)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => toggleReplyModal(row.commentId)}
            >
              <div className="mb-2">
                <h1 className="mb-1">
                  <span className="fs-5">پاسخ به کامنت</span> {row.commentTitle}
                </h1>
              </div>
            </ModalHeader>
            {openReplyModalId === row.commentId && (
              <AddModal
                // toggleModal={(value) => toggleModal(value)}
                // data={data}
                // replyColumns={replyColumns}
                rowId={row.commentId}
                courseId={row.courseId}
                // openModalId={openModalId}
              />
            )}
          </Modal>
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
        <Row className="ltr" style={{ margin: "20px" }}>
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="rows-per-page" style={{ marginRight: "20px" }}>
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
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                placeholder="جستجو"
                // value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            pagination
            responsive
            paginationServer
            columns={column}
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
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
