// ** Reactstrap Imports
import { Badge, Card, UncontrolledTooltip } from "reactstrap";

// ** Third Party Components
import { ChevronDown, FileText, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const UserCourseReserve = (data) => {
  const columns = [
    {
      sortable: true,
      minWidth: "130px",
      name: "نام دوره",
      selector: (row) => row.courseName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: " تاریخ رزرو دوره",
      selector: (row) => row.reserverDate.slice(0, 10),
    },
    {
      name: "وضعیت دوره ",
      selector: (row) => row.accept,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {/* <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' /> */}
            </div>
            <div className="d-flex flex-column">
              <span
                className="text-truncate fw-bolder"
                style={{ width: "250px" }}
              >
                {row.accept ? (
                  <Badge
                    color="light-success"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    رزرو شده
                  </Badge>
                ) : (
                  <Badge
                    color="light-danger"
                    className="fs-5"
                    style={{ width: "auto", textAlign: "center" }}
                  >
                    رزرو نشده
                  </Badge>
                )}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex">
          <div className="btn btn-sm" onClick={() => handleAccept()}>
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
              جزییات دوره
            </UncontrolledTooltip>
          </div>
          <div
            className="btn btn-sm"
            onClick={() => handleDelete(row?.reserveId)}
          >
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف دوره
            </UncontrolledTooltip>
          </div>
        </div>
      ),
    },
  ];
  const handleAccept = () => {};
  const handleDelete = useCourseReserveHandleDelete();
  console.log(data);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.data.coursesReseves}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserCourseReserve;
