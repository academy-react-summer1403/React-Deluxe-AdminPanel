// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'
import UserProjectsList from './UserProjectsList'


const UserTabs = () => {

  const [active,setActive] = useState('1')
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment >
      <Nav pills className='mb-2' style={{ width: '630px' }}>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => setActive('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => setActive('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => setActive('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => setActive('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>سایر اطلاعات کاربر</span>
          </NavLink>
        </NavItem>
      
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
         {/* <UserProjectsList/> */}

       
        </TabPane>
        <TabPane tabId='2'>
        {/* <div>component 2</div> */}

          {/* <SecurityTab /> */}
        </TabPane>
        <TabPane tabId='3'>
        {/* <div>component 3</div> */}

          {/* <BillingPlanTab /> */}
        </TabPane>
        <TabPane tabId='4'>
        {/* <div>component 4</div> */}

          {/* <Notifications /> */}
        </TabPane>
        <TabPane tabId='5'>
        {/* <div>component 5</div> */}

          {/* <Connections /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
