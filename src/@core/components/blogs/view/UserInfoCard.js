// ** React Imports
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, Eye, MessageSquare } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useGetBlogDetails } from "../../../../core/services/api/GetBlogDetail";
import { DatePersianizer } from "./../../../../utility/utils/DatePersianizer";
import { EditBlogForm } from "./EditBlogForm/EditBlogForm";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedUser.username,
      // lastName: selectedUser.fullName.split(' ')[1],
      // firstName: selectedUser.fullName.split(' ')[0]
    },
  });

  // ** render user img
  const renderUserImg = () => {
    // if (selectedUser !== null && selectedUser.avatar.length)
    {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          // src={selectedUser.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
      // } else {
      // return (
      //   <Avatar
      //     initials
      //     // color={selectedUser.avatarColor || 'light-primary'}
      //     className='rounded mt-3 mb-2'
      //     // content={selectedUser.fullName}
      //     contentStyles={{
      //       borderRadius: 0,
      //       fontSize: 'calc(48px)',
      //       width: '100%',
      //       height: '100%'
      //     }}
      //     style={{
      //       height: '110px',
      //       width: '110px'
      //     }}
      //   />
      // )
    }
  };
  // getQuery("newsdetail", `news/${id}`);
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["newsdetail"],
  // });

  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <div>اطلاعات یافت نشد</div>;

  // const UserInfoCard = () => {
  //   const { id } = useParams();

  //   if (!id) {
  //     return <div>شناسه معتبر نیست</div>;
  //   }

  //   const { data, isError, isLoading } = useQuery({
  //     queryKey: ["newsdetail", id],
  //     queryFn: () => getQuery(`news/${id}`),
  //     onError: (error) => console.error('Error fetching data:', error),
  //   });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>اطلاعات یافت نشد</div>;
  const { id } = useParams();

  const { data } = useGetBlogDetails(id);
  // const { detailsNewsDto } = data;
  // console.log(data);

  return (
    <div style={{ width: "25%" }}>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <Avatar
                img={data?.detailsNewsDto.currentImageAddress}
                imgHeight={150}
                imgWidth={150}
              />
              <div className="d-flex flex-column align-items-center text-center mt-2">
                <div className="user-info">
                  <h4 className=" fs-3 fw-bolder">
                    {data?.detailsNewsDto.title}
                  </h4>
                  {data?.detailsNewsDto.active ? (
                    <Badge
                      color="light-success"
                      className="fs-5"
                      style={{ width: "35px", textAlign: "center" }}
                    >
                      فعال
                    </Badge>
                  ) : (
                    <Badge
                      color="light-danger"
                      className="fs-5"
                      style={{ width: "70px", textAlign: "center" }}
                    >
                      غیر فعال
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.currentView}</h4>
                <small>بازدیدها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.commentsCount}</h4>
                <small>کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {/* {selectedUser !== null ? ( */}
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">نام نویسنده:</span>
                <span>{data?.detailsNewsDto.addUserFullName}</span>
                {/* <span>{data.googleTitle}</span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">دسته بندی :</span>
                <span>{data?.detailsNewsDto.newsCatregoryName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان کوتاه:</span>
                {/* <Badge className='text-capitalize'  */}
                {/* color={statusColors[selectedUser.status]} */}
                {/* > */}
                {/* {selectedUser.status} */}
                {/* </Badge> */}
                <span>{data?.detailsNewsDto.miniDescribe}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان گوگل:</span>
                {/* <span className='text-capitalize'> */}
                <span>{data?.detailsNewsDto.googleTitle}</span>
                {/* </span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> تاریخ ایجاد:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.insertDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ بروزرسانی:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.updateDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">توضیحات دوره:</span>
                <span>{data?.detailsNewsDto.describe}</span>
              </li>
            </ul>
            {/* ) : null} */}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              // onClick={() => handleActiveDeactive(data)}
            >
              غیرفعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <EditBlogForm data={data}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserInfoCard;
