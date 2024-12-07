import { useEffect, useState } from "react";
import { selectThemeColors } from "./../../../utility/Utils";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
} from "reactstrap";
import { useCourseGroupsAll } from "../../../core/services/api/CourseGroupsAll";
import Select from "react-select";
import { useCourseAll } from "../../../core/services/api/CourseAll";
import { useCourseDetail } from "../../../core/services/api/CourseDetail";
import { useCourseGroups } from "../../../core/services/api/CourseGroups";
import { useAddSchedual } from "../../../core/services/api/AddSchedual";
import toast from "react-hot-toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const AddEventSidebar = ({ open, handleAddEventSidebar, EventStart }) => {
  const [groupId, setGroupId] = useState();
  const [eventDetails, setEventDetails] = useState({
    // title: "",
    startDate: EventStart,
    startTime: "",
    endTime: "",
    weekNumber: "",
    rowEffect: "",
    // end: EventStart,
    // description: "",
  });
  const [courseId, setCourseId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      startDate: EventStart,
      // end: EventStart,
    }));
  }, [EventStart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const mutation = useAddSchedual();

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToast = toast.loading("درحال افزودن رویداد");
    try {
      await mutation.mutateAsync({ courseId, groupId, eventDetails });
      toast.success("رویداد با موفقیت افزوده شد!", { id: userToast });
      queryClient.invalidateQueries("SchedualAdmin");
    } catch (error) {
      toast.error(`افزودن رویداد با مشکل مواجه شد!`, { id: userToast });
      console.log(error);
    }
    console.log("Event added:", eventDetails);
    handleAddEventSidebar(); // Close sidebar
  };

  const { data: courses } = useCourseAll();

  console.log(courses);
  const CourseOptions = courses?.courseDtos.map((option) => ({
    value: option?.courseId,
    label: option?.title,
  }));

  const handleCourseSelect = (e) => {
    console.log(e);
    setCourseId(e.value);
  };

  const { data } = useCourseDetail(courseId);
  console.log(data);
  // setTeacherId(data?.teacherId)

  const { data: CourseGroups } = useCourseGroups(courseId, data?.teacherId);
  console.log(CourseGroups);
  // const { data } = useCourseGroupsAll();

  // console.log(data);

  const GroupOptions = CourseGroups?.map((option) => ({
    value: option?.groupId,
    label: option?.groupName,
  }));

  console.log(GroupOptions);

  return (
    <Modal
      isOpen={open}
      className="sidebar-lg"
      toggle={handleAddEventSidebar}
      // onOpened={handleSelectedEvent}
      // onClosed={handleResetInputValues}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <div className="sidebar">
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="courseGroupId">گروه</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={true}
                  // isOptionSelected={(e) => console.log(e)}
                  id={"courseGroupId"}
                  className="react-select"
                  classNamePrefix="select"
                  options={CourseOptions}
                  name={"courseGroupId"}
                  placeholder="انتخاب کنید"
                  onChange={(e) => handleCourseSelect(e)}

                  // onChange={(e) => setGroupId(e)}
                  // defaultValue={countryOptions[0]}
                />
              </FormGroup>
              <FormGroup>
                <Label for="courseGroupId">گروه</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={true}
                  // isOptionSelected={() => setIsSelected(true)}
                  id={"courseGroupId"}
                  className="react-select"
                  classNamePrefix="select"
                  options={GroupOptions}
                  name={"courseGroupId"}
                  placeholder="انتخاب کنید"
                  onChange={(e) => setGroupId(e)}
                  // defaultValue={countryOptions[0]}
                />
              </FormGroup>
              <FormGroup>
                <Label for="startDate">تاریخ شروع</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={eventDetails.startDate}
                  onChange={handleInputChange}
                  required
                  placeholder="تاریخ شروع"
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">ساعت شروع</Label>
                <Input
                  type=""
                  name="startTime"
                  id="startTime"
                  // value={eventDetails.startDate}
                  onChange={handleInputChange}
                  required
                  placeholder="ساعت شروع"
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">ساعت پایان</Label>
                <Input
                  type="text"
                  name="endTime"
                  id="endTime"
                  // value={eventDetails.startDate}
                  onChange={handleInputChange}
                  required
                  placeholder="ساعت پایان"
                />
              </FormGroup>
              <FormGroup>
                <Label for="weekNumber">تعداد هفته</Label>
                <Input
                  type="text"
                  name="weekNumber"
                  id="weekNumber"
                  // value={eventDetails.description}
                  onChange={handleInputChange}
                  placeholder="تعداد هفته"
                />
              </FormGroup>
              <FormGroup>
                <Label for="rowEffect">rowEffect</Label>
                <Input
                  type="text"
                  name="rowEffect"
                  id="rowEffect"
                  // value={eventDetails.description}
                  onChange={handleInputChange}
                  placeholder="rowEffect"
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Add Event
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default AddEventSidebar;
