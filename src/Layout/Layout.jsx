import React from "react";

import { Outlet } from "react-router-dom";
import UserBar from "./UserBar";

/**
 * Layout Component
 * Wraps all pages with the common UserBar.
 */
const Layout = () => {
  const user = {
    username: "Name",
    coins: 100,
  };

  return (
    <div>
      <UserBar username={user.username} coins={user.coins} />
      <Outlet />
    </div>
  );
};

export default Layout;
