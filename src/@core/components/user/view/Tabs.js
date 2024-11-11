// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'
// import UserProjectsList from '../@core/components/user/view/UserProjectsList'

const UserTabs = () => {

  const [active,setActive] = useState("1")

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => setActive('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => setActive('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Security</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => setActive('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Billing & Plans</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => setActive('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => setActive('5')}>
            <Link className='font-medium-3 me-50' />
            <span className='fw-bold'>Connections</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
      <UserProjectsList />

          <div>component 1</div>
          {/* <UserProjectsList /> */}
          {/* <UserTimeline /> */}
          {/* <InvoiceList /> */}
        </TabPane>
        <TabPane tabId='2'>
        <div>component 2</div>

          {/* <SecurityTab /> */}
        </TabPane>
        <TabPane tabId='3'>
        <div>component 3</div>

          {/* <BillingPlanTab /> */}
        </TabPane>
        <TabPane tabId='4'>
        <div>component 4</div>

          {/* <Notifications /> */}
        </TabPane>
        <TabPane tabId='5'>
        <div>component 5</div>

          {/* <Connections /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
