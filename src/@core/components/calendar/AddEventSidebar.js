import { useState } from 'react'
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const AddEventSidebar = ({ open, handleAddEventSidebar }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    start: '',
    end: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventDetails({
      ...eventDetails,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Event added:', eventDetails)
    handleAddEventSidebar() // Close sidebar
  }

  return (
    open && (
      <div className='sidebar'>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for='title'>Event Title</Label>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  value={eventDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='start'>Start Time</Label>
                <Input
                  type='datetime-local'
                  name='start'
                  id='start'
                  value={eventDetails.start}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='end'>End Time</Label>
                <Input
                  type='datetime-local'
                  name='end'
                  id='end'
                  value={eventDetails.end}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  value={eventDetails.description}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button color='primary' type='submit'>
                Add Event
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  )
}

export default AddEventSidebar
