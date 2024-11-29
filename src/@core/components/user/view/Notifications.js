// ** Reactstrap Imports
import { Card, CardTitle, CardBody, Table, Input, Button } from 'reactstrap'
import linkedin from "@src/assets/images/icons/social/linkedin.png";
import twitter from "@src/assets/images/icons/social/twitter.png";


const Notifications = (data) => {
  const socialAccounts = [
    {
      linked: false,
      title: " Telegram Id",
      desc: data?.data.telegramLink !== "" && data?.data.telegramLink !== null && data?.data.telegramLink !== "کاربر لینک ندارد",
      logo: twitter,
    },
    {
      linked: true,
      title: "Linkdin Profile",
      desc: data?.data.linkdinProfile,
      logo: linkedin,
    },

  ];
  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-50' tag='h4'>
          شبکه های اجتماعی
        </CardTitle>
      </CardBody>
      {socialAccounts.map((item, index) => {
            return (
              <div key={index} className="d-flex mt-2">
                <div className="flex-shrink-0">
                  <img
                    className="me-1"
                    src={item.logo}
                    height="38"
                    width="38"
                  />
                </div>
                <div className="d-flex align-item-center justify-content-between flex-grow-1">
                  <div className="me-1">
                    <p className="fw-bolder mb-0">{item.title}</p>
                    <span>{item.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
    </Card>
  )
}

export default Notifications
