// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import * as yup from 'yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Edit, Trash, Settings, MessageSquare, ChevronRight } from 'react-feather'

import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const recentDevicesArr = [
  {
    device: 'Dell XPS 15',
    location: 'United States',
    browser: 'Chrome on Windows',
    activity: '10, Jan 2021 20:07'
  },
  {
    location: 'Ghana',
    device: 'Google Pixel 3a',
    browser: 'Chrome on Android',
    activity: '11, Jan 2021 10:16'
  },
  {
    location: 'Mayotte',
    device: 'Apple iMac',
    browser: 'Chrome on MacOS',
    activity: '11, Jan 2021 12:10'
  },
  {
    location: 'Mauritania',
    device: 'Apple iPhone XR',
    browser: 'Chrome on iPhone',
    activity: '12, Jan 2021 8:29'
  }
]

const defaultValues = {
  password: '',
  confirmPassword: ''
}

const AppAuthComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false)
    setShowDetailModal(false)
  }
  

    
  return (
    <Fragment>
      <h1 className='text-center mb-2 pb-50'>Add Authenticator App</h1>
      <h4>Authenticator Apps</h4>
      <p>
        Using an authenticator app like Google Authenticator, Microsoft Authenticator, Authy, or 1Password, scan the QR
        code. It will generate a 6 digit code for you to enter below.
      </p>
      <div className='d-flex justify-content-center my-2 py-50'>
        <img src={qrCode} alt='QR Code' className='img-fluid' width='122' />
      </div>
      <Alert color='warning'>
        <h4 className='alert-heading'>ASDLKNASDA9AHS678dGhASD78AB</h4>
        <div className='alert-body fw-normal'>
          If you having trouble using the QR code, select manual entry on your app
        </div>
      </Alert>
      <Row className='gy-1'>
        <Col xs={12}>
          <Input placeholder='Enter authentication code' />
        </Col>
        <Col className='d-flex justify-content-end' xs={12}>
          <Button outline color='secondary' className='mt-1 me-1' onClick={toggle}>
            Cancel
          </Button>
          <Button color='primary' className='mt-1'>
            <span className='me-50'>Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}

const AppSMSComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false)
    setShowDetailModal(false)
  }
  return (
    <Fragment>
      <h1 className='text-center mb-2 pb-50'>Add your number</h1>
      <h4>Verify Your Mobile Number for SMS</h4>
      <p>Enter your mobile phone number with country code and we will send you a verification code.</p>
      <Row className='gy-1 mt-1'>
        <Col xs={12}>
          <Cleave
            className='form-control'
            placeholder='1 234 567 8900'
            options={{ phone: true, phoneRegionCode: 'US' }}
          />
        </Col>
        <Col className='d-flex justify-content-end' xs={12}>
          <Button outline color='secondary' className='mt-1 me-1' onClick={toggle}>
            Cancel
          </Button>
          <Button color='primary' className='mt-1'>
            <span className='me-50'>Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}

const SecurityTab = () => {
  // ** Hooks
  const [show, setShow] = useState(false)
  const [authType, setAuthType] = useState('authApp')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    trigger()
    console.log(data)
  }
  const handleContinue = () => {
    setShow(false)
    setShowDetailModal(true)
  }

  // getQuery("courses", "/Course/CommentManagment");
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["courses"],
  // });
  
  
  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <div>اطلاعات یافت نشد</div>;
 

  return (
    <Fragment>
      <Card style={{ width: '620px' }}>
        <Table className='text-nowrap text-center' responsive>
          <thead>
            
            <tr>
              <th className='text-start'>نام دوره</th>
              <th>عنوان کامنت</th>
              <th>متن کامنت</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {recentDevicesArr.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='text-start'>
                    <span className='fw-bolder'>{item.browser}</span>
                  </td>
                  <td>{item.device}</td>
                  <td>{item.location}</td>
                  <td>{item.activity}</td>

                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-5 mx-50'>
          <h1 className='text-center mb-1'>Select Authentication Method</h1>
          <p className='text-center mb-3'>
            you also need to select a method by which the proxy
            <br />
            authenticates to the directory serve
          </p>
          <div className='custom-options-checkable'>
            <input
              type='radio'
              id='authApp'
              name='authType'
              checked={authType === 'authApp'}
              className='custom-option-item-check'
              onChange={() => setAuthType('authApp')}
            />
            <label
              htmlFor='authApp'
              className='custom-option-item d-flex align-items-center flex-column flex-sm-row px-3 py-2 mb-2'
            >
              <span>
                <Settings className='font-large-2 me-sm-2 mb-2 mb-sm-0' />
              </span>
              <span>
                <span className='custom-option-item-title d-block h3'>Authenticator Apps</span>
                <span className='mt-75'>
                  Get codes from an app like Google Authenticator, Microsoft Authenticator, Authy or 1Password.
                </span>
              </span>
            </label>
            <input
              type='radio'
              id='authSMS'
              name='authType'
              checked={authType === 'authSMS'}
              className='custom-option-item-check'
              onChange={() => setAuthType('authSMS')}
            />
            <label
              htmlFor='authSMS'
              className='custom-option-item d-flex align-items-center flex-column flex-sm-row px-3 py-2 mb-2'
            >
              <span>
                <MessageSquare className='font-large-2 me-sm-2 mb-2 mb-sm-0' />
              </span>
              <span>
                <span className='custom-option-item-title d-block h3'>SMS</span>
                <span className='mt-75'>We will send a code via SMS if you need to use your backup login method.</span>
              </span>
            </label>
          </div>
          <Button color='primary' className='float-end mt-2' onClick={handleContinue}>
            <span className='me-50'>Continue</span>
            <ChevronRight size={14} />
          </Button>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={showDetailModal}
        className='modal-dialog-centered modal-lg'
        toggle={() => setShowDetailModal(!showDetailModal)}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShowDetailModal(!showDetailModal)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-5 mx-50'>
          {authType === 'authApp' ? (
            <AppAuthComponent setShow={setShow} setShowDetailModal={setShowDetailModal} />
          ) : (
            <AppSMSComponent setShow={setShow} setShowDetailModal={setShowDetailModal} />
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default SecurityTab
