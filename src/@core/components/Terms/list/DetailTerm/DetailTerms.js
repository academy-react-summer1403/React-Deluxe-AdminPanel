import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useDetailTerm } from "../../../../../core/services/api/DetailTerm";

const DetailTerms = ({rowId}) => {

  const { data, isError, isLoading } = useDetailTerm(rowId);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle tag="h4">جزییات بیشتر ترم</CardTitle>
      </CardHeader>
      <CardBody className="w-100">

        <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام ترم :</span>
                <span>{data?.termName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> شماره ساختمان  :</span>
                <span>{data?.departmentId}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام ساختمان :</span>
                <span>{data?.departmentName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ شروع ترم :</span>
                <span>{data?.startDate}</span>
              </li>
               <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ پایان ترم :</span>
                <span>{data?.endDate}</span>
              </li>
            </ul>
          </div>

      </CardBody>
    </Card>
  );
};
export { DetailTerms };
