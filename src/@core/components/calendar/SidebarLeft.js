import { Fragment, useState } from 'react'
import { Card, CardBody, Button, Input, Label } from 'reactstrap'
import illustration from '@src/assets/images/pages/calendar-illustration.png'

const filters = [
  { label: 'Personal', color: 'danger', className: 'form-check-danger mb-1' },
  { label: 'Business', color: 'primary', className: 'form-check-primary mb-1' },
  { label: 'Family', color: 'warning', className: 'form-check-warning mb-1' },
  { label: 'Holiday', color: 'success', className: 'form-check-success mb-1' },
  { label: 'ETC', color: 'info', className: 'form-check-info' }
]

const SidebarLeft = () => {
  const [selectedFilters, setSelectedFilters] = useState([])

  const handleFilterChange = (label) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(label)
        ? prevFilters.filter(filter => filter !== label)
        : [...prevFilters, label]
    )
  }

  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          {/* <Button color='primary' block onClick={() => console.log('Add Event Clicked')}>
            <span className='align-middle'>برای افزودن رویداد روی روز موردن</span>
          </Button> */}
        </CardBody>
        {/* <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filter</span>
          </h5>
          <div className='calendar-events-filter'>
            {filters.map(filter => (
              <div key={filter.label} className={`form-check ${filter.className}`}>
                <Input
                  type='checkbox'
                  id={`${filter.label}-event`}
                  checked={selectedFilters.includes(filter.label)}
                  onChange={() => handleFilterChange(filter.label)}
                />
                <Label className='form-check-label' htmlFor={`${filter.label}-event`}>
                  {filter.label}
                </Label>
              </div>
            ))}
          </div>
        </CardBody> */}
      </Card>
      {/* <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div> */}
    </Fragment>
  )
}

export default SidebarLeft
