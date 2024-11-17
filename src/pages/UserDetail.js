import UserInfoCard from "../@core/components/user/view/UserInfoCard";
import UserTabs from "../@core/components/user/view/Tabs";

const UserDetail = () => {
  return (
    <div className="d-flex gap-1">
      <UserInfoCard />
      <UserTabs />
    </div>
  );
};

export default UserDetail;
