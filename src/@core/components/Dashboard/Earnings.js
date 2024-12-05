// // ** Third Party Components
// import Chart from 'react-apexcharts'

// // ** Reactstrap Imports
// import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

// const Earnings = ({ success }) => {
//   const options = {
//     chart: {
//       toolbar: {
//         show: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     legend: { show: false },
//     comparedResult: [2, -3, 8],
//     labels: ['App', 'Service', 'Product'],
//     stroke: { width: 0 },
//     colors: ['#28c76f66', '#28c76f33', success],
//     grid: {
//       padding: {
//         right: -20,
//         bottom: -8,
//         left: -20
//       }
//     },
//     plotOptions: {
//       pie: {
//         startAngle: -10,
//         donut: {
//           labels: {
//             show: true,
//             name: {
//               offsetY: 15
//             },
//             value: {
//               offsetY: -15,
//               formatter(val) {
//                 return `${parseInt(val)} %`
//               }
//             },
//             total: {
//               show: true,
//               offsetY: 15,
//               label: 'App',
//               formatter() {
//                 return '53%'
//               }
//             }
//           }
//         }
//       }
//     },
//     responsive: [
//       {
//         breakpoint: 1325,
//         options: {
//           chart: {
//             height: 100
//           }
//         }
//       },
//       {
//         breakpoint: 1200,
//         options: {
//           chart: {
//             height: 120
//           }
//         }
//       },
//       {
//         breakpoint: 1065,
//         options: {
//           chart: {
//             height: 100
//           }
//         }
//       },
//       {
//         breakpoint: 992,
//         options: {
//           chart: {
//             height: 120
//           }
//         }
//       }
//     ]
//   }

//   return (
//     <Card className='earnings-card'>
//       <CardBody>
//         <Row>
//           <Col xs='6'>
//             <CardTitle className='mb-1'>Earnings</CardTitle>
//             <div className='font-small-2'>This Month</div>
//             <h5 className='mb-1'>$4055.56</h5>
//             <CardText className='text-muted font-small-2'>
//               {/* <span className='fw-bolder'>68.2%</span> */}
//               {/* <span> more earnings than last month.</span> */}
//             </CardText>
//           </Col>
//           <Col sm='12'>
//             <Chart options={options} series={[53, 16, 31]} type='donut' height={260}  width={310}/>
//           </Col>
//         </Row>
//       </CardBody>
//     </Card>
//   )
// }

// export default Earnings

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  CardHeader,
} from "reactstrap";

const Earnings = ({ Report, success }) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: { show: true },
    labels: ["تایید شده", "تایید نشده"], // Custom labels
    stroke: { width: 0 },
    colors: ["#2299f8", "#eb5d5e"], // Custom colors
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseFloat(val).toFixed(0)} %`; // Format to two decimals
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "رزرو های تایید شده",
              formatter() {
                return `${parseFloat(Report?.reserveAcceptPercent || 0)
                  // + parseFloat(Report?.reserveNotAcceptPercent || 0)
                  .toFixed(0)} %`; // Display total percentage
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <Card className="earnings-card">
      <CardBody className="d-flex flex-column items-center">
        <Row>
          <CardHeader className="justify-content-center">
            <Col xs="6">
              <CardTitle className="mb-1 w-100 text-nowrap">درصد رزرو های تایید شده</CardTitle>
              {/* <div className="font-small-2">This Month</div>
            <h5 className="mb-1">${Report?.totalEarnings || 'N/A'}</h5>
            <CardText className="text-muted font-small-2">
              <span className="fw-bolder">{Report?.growth || 'N/A'}</span>
              <span> more earnings than last month.</span>
            </CardText> */}
            </Col>
          </CardHeader>
          <Col sm="12">
            <Chart
              options={options}
              series={[
                parseFloat(Report?.reserveAcceptPercent || 50),
                parseFloat(Report?.reserveNotAcceptPercent || 50),
              ]} // Dynamic values for chart
              type="donut"
              height={260}
              width={310}
              className={"d-flex justify-content-center"}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
