import React from 'react';
import { Outlet } from 'react-router-dom';
import UserBar from './UserBar';
import { UserContextType, useUser } from '../../context/UserContext';




/**
 * Layout Component
 * Wraps all pages with the common UserBar.
 */
const Layout = (
  {} : {}
) => {

  const userContext: UserContextType = useUser();
  
  return (
    <div>
      <UserBar username={userContext.user?.username!} coins={userContext.user?.coins!} />
      <Outlet />
    </div>
  );
};

export default Layout;
