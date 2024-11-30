// ** React Imports
import { Fragment} from 'react'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  
} from 'reactstrap'


import { useParams } from 'react-router-dom'
import { useCourseUser } from '../../../../core/services/api/CourseUser'


const CoursesDescribe = () => {

  const { id } = useParams();

  const { data } = useCourseUser(id);
   console.log(data)

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>نوضیحات دوره </CardTitle>
        </CardHeader>
        <CardBody>
        <span>{data.describe}</span>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default CoursesDescribe
