import CourseGroupInfoCard from "../@core/components/course/view/CourseGroupDetail/CourseGroupInfoCard";
import CourseGroupTabs from "../@core/components/course/view/CourseGroupDetail/CourseGroupTabs";
import CourseInfoCard from "../@core/components/course/view/CourseInfoCard";
import UserTabs from "../@core/components/course/view/Tabs";

const CourseDetail = () => {
  return (
    <div className="d-flex gap-1">
      <CourseGroupInfoCard />
      <CourseGroupTabs />
    </div>
  );
};

export default CourseDetail;
