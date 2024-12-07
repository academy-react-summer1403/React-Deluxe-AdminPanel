import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useDetailBuilding } from "../../../../../core/services/api/DetailBuilding";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";

const DetailBuilding = ({rowId}) => {

  const { data, isError, isLoading } = useDetailBuilding(rowId);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle tag="h4">جزییات  ساختمان</CardTitle>
      </CardHeader>
      <CardBody className="w-100">

        <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام ساختمان :</span>
                <span>{data?.buildingName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> شماره ساختمان  :</span>
                <span>{data?.floor}</span>
              </li>
              {/* <li className="mb-75">
                <span className="fw-bolder me-25"> نام ساختمان :</span>
                <span>{data?.departmentName}</span>
              </li> */}
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ  تاسیس :</span>
                <span>{DatePersianizer(data?.workDate.slice(0, 10))}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> عرض جغرافیا :</span>
                <span>{data?.latitude}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">  طول جغرافیایی  :</span>
                <span>{data?.longitude}</span>
              </li>
            </ul>
          </div>

      </CardBody>
    </Card>
  );
};
export { DetailBuilding };
