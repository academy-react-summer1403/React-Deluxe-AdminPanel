// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>افزودن خبر جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1 '>
              <Label className='form-label' for='nameMulti'>
عنوان خبر
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='تیتر' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                عنوان گوگل
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder=' لینک' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                 توضیحات گوگل
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='توضیحات' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                توضیح کوتاه
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                کلمات کلیدی
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='کلیدی' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                دسته بندی خبر
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='اخبار پژوهشگاه' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  ثبت
                </Button>
                <Button outline color='secondary' type='reset'>
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default MultipleColumnForm