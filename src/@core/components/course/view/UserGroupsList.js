// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import { ChevronDown, FileText, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useCourseUser } from "../../../../core/services/api/CourseUser";
import { Badge } from "reactstrap";
import { useCourseGroups } from "../../../../core/services/api/CourseGroups";
import { useRef, useState } from "react";
import { Form } from "reactstrap";
import toast from "react-hot-toast";
import { useAddCourseGroup } from "../../../../core/services/api/AddCourseGroup";


const UserGroupsList = () => {
  const columns = [
    {
      minWidth: "130px",
      name: "نام گروه",
      selector: (row) => row.groupName,
      center: true,
    
    },
    {
      name: "ظرفیت گروه",
      selector: (row) => row.groupCapacity,
      center: true,
    },
    {
      name: "ظرفیت دوره",
      selector: (row) => row.courseCapacity,
      center: true,
    },
    {
      name: "شماره گروه",
      selector: (row) => row.groupId,
      center: true,
    
    },
    {
      name: "اقدامات",
      selector: (row) => row.groupId,
      center: true,
      cell: (row) => {
        return (
          <div className="column-action d-flex">
            <Link
              to={`/courseGroupDetail/${row?.groupId}`}
            
            > 
            <div className="btn btn-sm">
              <FileText
                className="cursor-pointer "
                size={17}
                id={`send-tooltip-${row.id}`}
              />
              <UncontrolledTooltip
             
                placement="top"
                target={`send-tooltip-${row.id}`}
                // className="mb-1"
              >
                 جزییات گروه
              </UncontrolledTooltip>
            </div></Link>
           
            <div className="btn btn-sm" onClick={() => handleDelete(row)}>
              <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
              <UncontrolledTooltip
                placement="top"
                target={`pw-tooltip-${row.id}`}
              >
                حذف گروه
              </UncontrolledTooltip>
            </div>
            {/* <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => {
                //   e.preventDefault()
                //   store.dispatch(deleteUser(row.id))
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          </div>
        );
      },
    },
  ];

  const [show, setShow] = useState(false);
  const formRef = useRef(null);
  const { id } = useParams();

  const { data: data2 } = useQuery({
    queryKey: ["userdetail"],
  });
  console.log(data2);

  const { data } = useCourseGroups(id, data2.teacherId);

  console.log(data);

  const mutation = useAddCourseGroup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // const formValues = Object.fromEntries(formData.entries());
    formData.append("CourseId", data2?.courseId);
    console.log(formData);
    // console.log("Form Submitted Values:", formValues);
    const blogToast = toast.loading("درحال ساختن گروه شما...");
    try {
      await mutation.mutateAsync(formData);
      toast.success("گروه شما با موفقیت اضافه شد!", { id: blogToast });
    } catch (error) {
      toast.error(
        `افزودن گروه شما با خطا مواجه شد:
        ${
          error.response.data.errors
            ? error.response.data.errors
            : error.response.data.ErrorMessage
        }`,
        { id: blogToast }
      );
    }
    // {
    //   mutation.isPending ? (blogToast = toast.loading("Adding...")) : "";
    // }
  };
  return (
    <Card>
      <CardHeader>
        <Button color="primary" size="md" onClick={() => setShow(true)}>
          افزودن گروه
        </Button>
      </CardHeader>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          {/* <div>header</div> */}
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          {/* <EditCourseForm data2={data2} data3={data3} /> */}
          <Form onSubmit={handleSubmit} innerRef={formRef}>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GroupName">
                نام گروه
              </Label>
              <Input
                type="text"
                name="GroupName"
                id="GroupName"
                placeholder="نام گروه"
              />
            </Col>
            <Col lg="12" md="12" sm="12" className="mb-1">
              <Label className="form-label" for="GroupCapacity">
                ظرفیت گروه
              </Label>
              <Input
                type="text"
                name="GroupCapacity"
                id="GroupCapacity"
                placeholder="نام گروه"
              />
            </Col>
            <Col sm="12">
              {/* <div className="d-flex"> */}
              <Button
                className="mt-2"
                style={{ width: "100%" }}
                color="primary"
                type="submit"
              >
                افزودن
              </Button>
             
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default UserGroupsList;
