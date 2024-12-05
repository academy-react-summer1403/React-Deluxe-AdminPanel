import { useState } from "react";
import { Row, Col } from "reactstrap";
import Calendar from "./Calendar";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./AddEventSidebar";

const CalendarComponent = () => {
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  return (
    <div className='app-calendar overflow-hidden border'>
      <Row className='g-0'>
        <Col id='app-calendar-sidebar' className={`col app-calendar-sidebar flex-grow-0 ${leftSidebarOpen ? 'show' : ''}`}>
          <SidebarLeft
            handleAddEventSidebar={handleAddEventSidebar}
            toggleSidebar={toggleSidebar}
          />
        </Col>
        <Col className='position-relative'>
          <Calendar />
        </Col>
      </Row>
      <AddEventSidebar open={addSidebarOpen} handleAddEventSidebar={handleAddEventSidebar} />
    </div>
  );
};

export { CalendarComponent };
