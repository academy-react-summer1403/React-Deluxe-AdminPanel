import CourseInfoCard from "../@core/components/course/view/CourseInfoCard";
import UserTabs from "../@core/components/course/view/Tabs";

const CourseDetail = () => {
  return (
    <div className="d-flex gap-1">
      <CourseInfoCard />
      <UserTabs />
    </div>
  );
};

export default CourseDetail;
