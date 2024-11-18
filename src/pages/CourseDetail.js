import UserInfoCard from "../@core/components/course/view/UserInfoCard";
import UserTabs from "../@core/components/course/view/Tabs";



const CourseDetail = () => {
  return (
    <div className="d-flex gap-1">
      <UserInfoCard />
      <UserTabs />
    </div>
  );
};

export default CourseDetail;
