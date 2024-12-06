import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useDepartmentDetail } from "../../../../../core/services/api/DepartmentDetail";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";

const DetailDepartment = ({rowId}) => {

  const { data, isError, isLoading } = useDepartmentDetail(rowId);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle tag="h4">جزییات کامل دپارتمان</CardTitle>
      </CardHeader>
      <CardBody className="w-100">

        <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام دپارتمان :</span>
                <span>{data?.depName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام ساختمان  :</span>
                <span>{data?.buildingName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> شماره ساختمان :</span>
                <span>{data?.buildingId}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ  تاسیس :</span>
                <span>{DatePersianizer(data?.insertDate.slice(0, 10))}</span>
              </li>
            </ul>
          </div>

      </CardBody>
    </Card>
  );
};
export { DetailDepartment };
