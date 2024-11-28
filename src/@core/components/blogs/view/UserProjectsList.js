// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  Modal,
  ModalHeader,
  Progress,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import { ChevronDown, Eye, EyeOff, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ReplyModalBlogs } from "./ReplyModal/ReplyModalBlogs";

export const columns = [
  {
    sortable: true,
    minWidth: "200px",
    name: "کاربر",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.autor}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "عنوان کامنت",
    minWidth: "130px",
    center:true,
    selector: (row) => row.title,
  },
  {
    name: "متن کامنت",
    minWidth: "180px",
    // center:true,
    selector: (row) => row.describe,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <small className="mb-1">{row.describe}</small>
        </div>
      );
    },
  },
  {
    maxWidth: "150px",
    name: "اقدامات",
    selector: (row) => row.groupId,
    center: true,
    cell: (row) => {
      return (
        <div className="column-action d-flex">
          <div className="btn btn-sm">
            {row.acceptReplysCount > 0 ? (
              <div onClick={() => toggleModal(row.id)}>
                <Eye size={17} id={`eye-tooltip-${row.id}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.id}`}
                >
                  مشاهده پاسخ
                </UncontrolledTooltip>
              </div>
            ) : (
              <>
                <EyeOff size={17} id={`eye-tooltip-${row.id}`} />
                <UncontrolledTooltip
                  placement="top"
                  target={`eye-tooltip-${row.id}`}
                >
                  پاسخی نیست
                </UncontrolledTooltip>
              </>
            )}
          </div>

          <div className="btn btn-sm" onClick={() => handleDelete(row)}>
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف دوره
            </UncontrolledTooltip>
          </div>

          <Modal
            isOpen={openModalId === row.id}
            toggle={() => toggleModal(row.id)}
            className="modal-dialog-centered modal-xl"
          >
            <ModalHeader
              className="bg-transparent"
              toggle={() => toggleModal(row.id)}
            >
              <div className="mb-2">
                <h1 className="mb-1">
                  <span className="fs-5">پاسخ ها به کامنت</span> {row.title}
                </h1>
              </div>
            </ModalHeader>
            {openModalId === row.id && (
              <ReplyModal
                // toggleModal={(value) => toggleModal(value)}
                // data={data}
                // replyColumns={replyColumns}
                rowId={row.id}
                courseId={row.courseId}
                // openModalId={openModalId}
              />
            )}
          </Modal>
        </div>
      );
    },
  },
];

const UserProjectsList = () => {
  // getQuery("blogsdetail","");
  // const { commentDtos, isError, isLoading } = useQuery({
  //   queryKey: ["blogsdetail"],
  // });

  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <div>اطلاعات یافت نشد</div>;
  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const columns = [
    {
      sortable: true,
      minWidth: "200px",
      name: "کاربر",
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.autor}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "عنوان کامنت",
      minWidth: "130px",

      selector: (row) => row.title,
    },
    {
      name: "متن کامنت",
      minWidth: "180px",

      selector: (row) => row.describe,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100">
            <small className="mb-1">{row.describe}</small>
          </div>
        );
      },
    },
    {
      maxWidth: "150px",
      name: "اقدامات",
      selector: (row) => row.groupId,
      center: true,
      cell: (row) => {
        return (
          <div className="column-action d-flex">
            <div className="btn btn-sm">
              {row.replyCount > 0 ? (
                <div onClick={() => toggleModal(row.id)}>
                  <Eye size={17} id={`eye-tooltip-${row.id}`} />
                  <UncontrolledTooltip
                    placement="top"
                    target={`eye-tooltip-${row.id}`}
                  >
                    مشاهده پاسخ
                  </UncontrolledTooltip>
                </div>
              ) : (
                <>
                  <EyeOff size={17} id={`eye-tooltip-${row.id}`} />
                  <UncontrolledTooltip
                    placement="top"
                    target={`eye-tooltip-${row.id}`}
                  >
                    پاسخی نیست
                  </UncontrolledTooltip>
                </>
              )}
            </div>

            <div className="btn btn-sm" onClick={() => handleDelete(row)}>
              <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
              <UncontrolledTooltip
                placement="top"
                target={`pw-tooltip-${row.id}`}
              >
                حذف دوره
              </UncontrolledTooltip>
            </div>

            <Modal
              isOpen={openModalId === row.id}
              toggle={() => toggleModal(row.id)}
              className="modal-dialog-centered modal-xl"
            >
              <ModalHeader
                className="bg-transparent"
                toggle={() => toggleModal(row.id)}
              >
                <div className="mb-2">
                  <h1 className="mb-1">
                    <span className="fs-5">پاسخ ها به کامنت</span> {row.title}
                  </h1>
                </div>
              </ModalHeader>
              {openModalId === row.id && (
                <ReplyModalBlogs
                  // toggleModal={(value) => toggleModal(value)}
                  // data={data}
                  // replyColumns={replyColumns}
                  rowId={row.id}
                  // courseId={row.courseId}
                  // openModalId={openModalId}
                />
              )}
            </Modal>
          </div>
        );
      },
    },
  ];

  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["GetBlogDetails", id],
  });
  console.log(data);

  return (
    <Card style={{ width: "73%" }}>
      <CardHeader tag="h4">کامنت ها</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data?.commentDtos}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
