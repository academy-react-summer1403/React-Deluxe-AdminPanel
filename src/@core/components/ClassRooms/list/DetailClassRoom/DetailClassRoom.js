import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useClassRoomDetail } from "../../../../../core/services/api/DetailClassRoom";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";

const DetailClassRoom = ({rowId}) => {

  const { data, isError, isLoading } = useClassRoomDetail(rowId);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle tag="h4">جزییات کامل کلاس</CardTitle>
      </CardHeader>
      <CardBody className="w-100">

        <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام کلاس :</span>
                <span>{data?.classRoomName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> شماره ساختمان  :</span>
                <span>{data?.buildingId}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">  ظرفیت :</span>
                <span>{data?.capacity}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">  نام ساختمان :</span>
                <span>{data?.buildingName}</span>
              </li>
               <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ  برگزاری :</span>
                <span>{DatePersianizer(data?.insertDate.slice(0, 10))}</span>
              </li>
            </ul>
          </div>

      </CardBody>
    </Card>
  );
};
export { DetailClassRoom };
