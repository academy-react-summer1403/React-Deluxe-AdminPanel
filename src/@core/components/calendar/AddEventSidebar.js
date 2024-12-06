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

const AddEventSidebar = ({ open, handleAddEventSidebar, EventStart }) => {
  const [groupId, setGroupId] = useState();
  const [eventDetails, setEventDetails] = useState({
    title: "",
    startDate: EventStart,
    end: EventStart,
    description: "",
  });

  useEffect(() => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      startDate: EventStart,
      end: EventStart,
    }));
  }, [EventStart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event added:", eventDetails);
    console.log(groupId);
    handleAddEventSidebar(); // Close sidebar
  };

  const { data } = useCourseGroupsAll();

  console.log(data);

  const GroupOptions = data?.courseGroupDtos.map((option) => ({
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
                <Label for="startDate">ساعت شروع</Label>
                <Input
                  type=""
                  name="startDate"
                  id="startDate"
                  // value={eventDetails.startDate}
                  onChange={handleInputChange}
                  required
                  placeholder="ساعت شروع"
                />
              </FormGroup>
              <FormGroup>
                <Label for="startDate">ساعت پایان</Label>
                <Input
                  type="text"
                  name="startDate"
                  id="startDate"
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
                افزودن 
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default AddEventSidebar;
