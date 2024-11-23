// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps/Address";
import SocialLinks from "./steps/SocialLinks";
import PersonalInfo from "./steps/PersonalInfo";
import AccountDetails from "./steps/AccountDetails";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { GetCreateCourse } from "../../../../core/services/api/GetCreateCourse";

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [finalFormData, setFinalFormData] = useState();

  console.log("finalFormData1", finalFormData);
  // const {isError , isLoading} = useQuery({
  //   queryKey: ["CreateCourseInfo"]
  //   queryFn:
  // })
  const { data } = GetCreateCourse();
  console.log("data", data);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات دوره مرحله اول",
      subtitle: "اطلاعات دوره را وارد نمایید.",
      icon: 1,
      // <FileText size={18} />
      content: (
        <AccountDetails
          stepper={stepper}
          type="modern-vertical"
          finalFormData={finalFormData}
          setFinalFormData={setFinalFormData}
        />
      ),
    },
    {
      id: "personal-info",
      title: "اطلاعات دوره مرحله دوم",
      subtitle: "اطلاعات دوره را وارد نمایید",
      icon: 2,
      // <User size={18} />
      content: (
        <PersonalInfo
          stepper={stepper}
          type="modern-vertical"
          data={data}
          setFinalFormData={setFinalFormData}
        />
      ),
    },
    {
      id: "step-address",
      title: "اطلاعات دوره مرحله سوم",
      subtitle: "اطلاعات دوره را وارد نمایید",
      icon: 3,
      //  <MapPin size={18} />
      content: (
        <Address
          stepper={stepper}
          type="modern-vertical"
          setFinalFormData={setFinalFormData}
        />
      ),
    },
    {
      id: "social-links",
      title: "افزودن تکنولوژی",
      subtitle: "تکنولوژی را وارد نمایید",
      icon: 4,
      //  <Link size={18} />
      content: (
        <SocialLinks
          stepper={stepper}
          type="modern-vertical"
          data={data}
          finalFormData={finalFormData}
          setFinalFormData={setFinalFormData}
        />
      ),
    },
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModernVertical;
