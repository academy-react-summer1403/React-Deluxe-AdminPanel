// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import {
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

// ** Icons Imports
import operaIcons from '@src/assets/images/icons/opera.png'
import safariIcon from '@src/assets/images/icons/apple-safari.png'
import IEIcon from '@src/assets/images/icons/internet-explorer.png'
import chromeIcon from '@src/assets/images/icons/google-chrome.png'
import firefoxIcon from '@src/assets/images/icons/mozila-firefox.png'
import { useUserList } from '../../../core/services/api/userList'
import { useUserManageInfo } from '../../../core/services/api/UserManageInfo'
import Admin from "../../../assets/images/avatars/Admin.png"
import Teacher from "../../../assets/images/avatars/Teacher.png"
import Student from "../../../assets/images/avatars/Student.png"
import Mentor from "../../../assets/images/avatars/Male.png"


const CardBrowserState = ({ colors, trackBgColor }) => {
  const { data: data2 } = useUserList();
  const { data } = useUserManageInfo("1");
  const { data: data3 } = useUserManageInfo("2");
  const { data: data4 } = useUserManageInfo("5");
  const { data: data5 } = useUserManageInfo("9");

  const statesArr = [
    {
      avatar: Admin,
      title: 'ادمین',
      value: data?.totalCount,
      chart: {
        type: 'radialBar',
        series: [54.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          // colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: Teacher,
      title: 'اساتید',
      value: data3?.totalCount,
      chart: {
        type: 'radialBar',
        series: [6.1],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          // colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: Student,
      title: 'دانشجو ها',
      value: data4?.totalCount,
      chart: {
        type: 'radialBar',
        series: [14.6],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          // colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: Mentor,
      title: 'منتور ها',
      value: data5?.totalCount,
      chart: {
        type: 'radialBar',
        series: [4.2],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          // colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    // {
    //   avatar: operaIcons,
    //   title: 'Opera Mini',
    //   value: '8.4%',
    //   chart: {
    //     type: 'radialBar',
    //     series: [8.4],
    //     height: 30,
    //     width: 30,
    //     options: {
    //       grid: {
    //         show: false,
    //         padding: {
    //           left: -15,
    //           right: -15,
    //           top: -12,
    //           bottom: -15
    //         }
    //       },
    //       // colors: [colors.danger.main],
    //       plotOptions: {
    //         radialBar: {
    //           hollow: {
    //             size: '22%'
    //           },
    //           track: {
    //             background: trackBgColor
    //           },
    //           dataLabels: {
    //             showOn: 'always',
    //             name: {
    //               show: false
    //             },
    //             value: {
    //               show: false
    //             }
    //           }
    //         }
    //       },
    //       stroke: {
    //         lineCap: 'round'
    //       }
    //     }
    //   }
    // }
  ]

  const renderStates = () => {
    return statesArr.map(state => {
      return (
        <div key={state.title} className='browser-states'>
          <div className='d-flex'>
            <img className='rounded me-1' src={state.avatar} height='30' alt={state.title} />
            <h6 className='align-self-center mb-0'>{state.title}</h6>
          </div>
          <div className='d-flex align-items-center'>
            <div className='fw-bold text-body-heading me-1'>{state.value}</div>
            <Chart
              options={state.chart.options}
              series={state.chart.series}
              type={state.chart.type}
              height={state.chart.height}
              width={state.chart.width}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <Card className='card-browser-states'>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>کاربران به تفکیک نقش</CardTitle>
          {/* <CardText className='font-small-2'>Counter August 2020</CardText> */}
        </div>
        {/* <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            <MoreVertical size={18} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className='w-100'>Last 28 Days</DropdownItem>
            <DropdownItem className='w-100'>Last Month</DropdownItem>
            <DropdownItem className='w-100'>Last Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  )
}

export default CardBrowserState
