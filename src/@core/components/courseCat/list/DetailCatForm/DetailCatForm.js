import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useCourseCatDetail } from "../../../../../core/services/api/DetailCourseCat";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";

const DetailCatForm = ({rowId}) => {

  const { data, isError, isLoading } = useCourseCatDetail(rowId);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle tag="h4">جزییات کامل دسته بندی</CardTitle>
      </CardHeader>
      <CardBody className="w-100">

        <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام دسته بندی :</span>
                <span>{data?.categoryName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">  عنوان گوگل  :</span>
                <span>{data?.googleTitle}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">  توضیح گوگل :</span>
                <span>{data?.googleDescribe}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ دسته بندی :</span>
                <span>{DatePersianizer(data?.insertDate.slice(0, 10))}</span>
              </li>
            </ul>
          </div>

      </CardBody>
    </Card>
  );
};
export { DetailCatForm };
