// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const GoalOverview = (props) => {
  // ** State
  const [data, setData] = useState(null);

  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#51e5a8"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "72%",
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#5e5873",
              fontFamily: "Montserrat",
              fontSize: "2.86rem",
              fontWeight: "600",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = [83];

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">درصد تکمیل پروفایل ادمین</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={230}
        />
      </CardBody>
    </Card>
  );
};
export default GoalOverview;
