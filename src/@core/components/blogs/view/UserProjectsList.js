// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown, Eye, EyeOff } from "react-feather";
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
    name: "پاسخ ها",
    selector: (row) => row.replyCount,
    cell: (row) => {
      return row.replyCount > 0 ? <Eye /> : <EyeOff />;
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
