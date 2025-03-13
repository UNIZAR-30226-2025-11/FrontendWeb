import React from 'react';
import { Outlet } from 'react-router-dom';
import UserBar from './UserBar';

/**
 * Layout Component
 * Wraps all pages with the common UserBar.
 */
const Layout = (
  {
    username
  } : {
    username:string
  }
) => {

  return (
    <div>
      <UserBar username={username} coins={100} />
      <Outlet />
    </div>
  );
};

export default Layout;
