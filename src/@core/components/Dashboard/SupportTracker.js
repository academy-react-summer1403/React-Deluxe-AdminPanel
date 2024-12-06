// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { ThemeColors } from '../../../utility/context/ThemeColors'

const SupportTracker = ({Report}) => {
  // ** State
  const [data, setData] = useState(null)
 const context = useContext(ThemeColors)
console.log(Report)
 const percentage = parseInt(Report?.activeUserPercent);
console.log(percentage)


  const options = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: '#fff',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: 'Montserrat',
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              fontFamily: 'Montserrat',
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [context.colors.danger.main],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [context.colors.primary.main],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['کاربر های فعال']
    },
    series = [percentage]

  return(
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle tag='h3'>آمار کل کاربران</CardTitle>
        {/* <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu end>
            {data.last_days.map(item => (
              <DropdownItem className='w-100' key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='2' className='d-flex flex-column flex-wrap text-center'>
            <h3 className='font-large-2 fw-bolder mt-2 mb-0'></h3>
            {/* <CardText>Tickets</CardText> */}
          </Col>
          <Col sm='10' className='d-flex justify-content-center'>
            <Chart options={options} series={series} type='radialBar' height={270} id='support-tracker-card' />
          </Col>
        </Row>
        <div className='d-flex justify-content-around mt-1'>
          {/* <div className='text-center'>
            <CardText className='mb-50'>New Tickets</CardText>
            <span className='font-large-1 fw-bold'>moz</span>
          </div> */}
          <div className='text-center'>
            <CardText className='mb-50'>تعداد کل کاربران</CardText>
            <span className='font-large-1 fw-bold'>{Report?.allUser}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>درصد کاربران غیرفعال</CardText>
            <span className='font-large-1 fw-bold'>{parseInt(Report?.interActiveUserPercent)}%</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
export default SupportTracker
