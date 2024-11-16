// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap';

// ** Icons Imports
import { User, Lock, Bookmark, Bell } from 'react-feather';
import UserProjectsList from './UserProjectsList';
import Connections from './Connections';
import SecurityTab from './SecurityTab';

const UserTabs = () => {
  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      {/* تب‌ها */}
      <Nav pills className="mb-2" style={{ width: '700px', position: 'relative' }}>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggle('1')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggle('2')}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggle('3')}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggle('4')}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطلاعات کاربر</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '5'} onClick={() => toggle('5')}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">ارتباط</span>
          </NavLink>
        </NavItem> */}
      </Nav>

      {/* محتوای تب دوره‌ها */}
      {active === '1' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>
          <UserProjectsList />
        </div>
      )}
          {active === '2' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>
          <UserProjectsList />
        </div>
      )}
           {active === '3' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>
          <SecurityTab />
        </div>
      )}
         {active === '4' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>
          <Connections />
        </div>
      )}
       {/* {active === '4' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>
       

        </div>
      )} */}
    </Fragment>
  );
};

export default UserTabs;
