import { Statuses } from "../@core/components/Status/list/status";
import UserInfoCard from "../@core/components/Status/view/StatusDetail";


const status = () => {
  return (
    <div className="d-flex justify-content-between">
      <UserInfoCard />
      <Statuses />
    </div>
  );
};

export default status;
