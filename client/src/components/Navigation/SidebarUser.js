import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SidebarUser() {
  const { user } = useSelector((state) => ({ ...state }));

  const [current, setCurrent] = useState("one");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="vertical">
      <Menu.Item key="one">
        <Link to="/user/history">History</Link>
      </Menu.Item>

      <Menu.Item key="two">
        <Link to="/user/password-update">Password Update</Link>
      </Menu.Item>

      <Menu.Item key="three">
        <Link to="/user/wishlist">Wishlist</Link>
      </Menu.Item>

      {user && user.role === "Admin" && (
        <Menu.Item key="five">
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default SidebarUser;
