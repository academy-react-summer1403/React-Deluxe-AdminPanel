import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Badge, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useCourseCommentReply } from "../../../../../core/services/api/CourseCommentReply";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";
import { useBlogCommentReply } from "../../../../../core/services/api/BlogCommentReply";

export const ReplyModalBlogs = (
  //   toggleModal,
  //   data,
  //   replyColumns,
  {
    rowId,
    // courseId
  }
) =>
  //   openModalId
  {
    console.log("blog comment id:", rowId);
    const replyColumns = [
      {
        maxWidth: "130px",
        name: "نام دانشجو",
        selector: (row) => row.autor,
        center: true,
      },
      {
        name: "عنوان کامنت",
        selector: (row) => row.title,
        center: true,
      },
      {
        name: "متن کامنت",
        selector: (row) => row.describe,
        center: true,
      },
      {
        maxWidth: "120px",
        name: "تاریخ کامنت",
        selector: (row) => DatePersianizer(row.inserDate),
        center: true,
      },
      {
        maxWidth: "100px",
        name: "وضعیت",
        // selector: (row) => row.groupId,
        center: true,
        cell: (row) => {
          return row.accept ? (
            <Badge
              color="light-success"
              className="fs-5"
              style={{ width: "65px", textAlign: "center" }}
            >
              تایید شده
            </Badge>
          ) : (
            <Badge
              color="light-danger"
              className="fs-5"
              style={{ width: "70px", textAlign: "center" }}
            >
              تایید نشده
            </Badge>
          );
        },
      },
    ];
    const { data } = useBlogCommentReply(rowId);
    return (
      <ModalBody className="pb-5 px-sm-5 mx-50">
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={replyColumns}
            data={data}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </ModalBody>
    );
  };
