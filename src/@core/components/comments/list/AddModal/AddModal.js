import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useCourseCommentReply } from "../../../../../core/services/api/CourseCommentReply";
import { DatePersianizer } from "../../../../../utility/utils/DatePersianizer";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useAddReplyToComment } from "../../../../../core/services/api/AddReplyToComment";
import toast from "react-hot-toast";

export const AddModal = (
  //   toggleModal,
  //   data,
  //   replyColumns,
  { rowId, courseId }
) =>
  //   openModalId
  {
    console.log(courseId);

    // const { data } = useCourseCommentReply(courseId, rowId);
    const formRef = useRef(null);

    const mutation = useAddReplyToComment();
    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      formData.append("CourseId", courseId);
      formData.append("CommentId", rowId);
      console.log(formData);

      const blogToast = toast.loading("درحال افزودن کامنت شما...");
      try {
        await mutation.mutateAsync(formData);
        toast.success("کامنت شما با موفقیت به دوره اضافه شد!", {
          id: blogToast,
        });
        queryClient.invalidateQueries("Comments");
      } catch (error) {
        toast.error(
          `افزودن کامنت شما با خطا مواجه شد:
        ${
          error.response.data.errors
            ? error.response.data.errors
            : error.response.data.ErrorMessage
        }`,
          { id: blogToast }
        );
      }
    };
    return (
      <ModalBody className="pb-5 px-sm-5 mx-50">
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Col lg="12" md="12" sm="12" className="mb-1">
            <Label className="form-label" for="Title">
              عنوان کامنت
            </Label>
            <Input
              type="text"
              name="Title"
              id="Title"
              placeholder="عنوان کامنت"
            />
          </Col>
          <Col lg="12" md="12" sm="12" className="mb-1">
            <Label className="form-label" for="Describe">
              متن کامنت
            </Label>
            <Input
              type="textarea"
              name="Describe"
              id="Describe"
              placeholder="متن کامنت"
            />
          </Col>
          <Col sm="12">
            {/* <div className="d-flex"> */}
            <Button
              className="mt-2"
              style={{ width: "100%" }}
              color="success"
              type="submit"
            >
              افزودن
            </Button>
          </Col>
        </Form>
      </ModalBody>
    );
  };
