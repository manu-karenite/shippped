import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.js";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  EnterOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
const { SubMenu } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  let username = "";
  if (user) {
    username = user.email.split("@")[0];
  }

  useEffect(() => {
    if (user && user.token) {
      const usernam = user.email.split("@")[0];
    }
  }, [user]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logoutHandler = () => {
    try {
      auth.signOut();
      dispatch({
        type: "LOGGED_OUT",
        payload: null,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      {user && user.token && (
        <Menu.Item key="wishlist" icon={<HeartOutlined />}>
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
      )}
      <Badge count={cart.length} offset={[9, 0]}>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart"> Cart</Link>
        </Menu.Item>
      </Badge>

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={username}
          className="float-end"
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:1" icon={<ProfileOutlined />}>
              {user && user.role === "Admin" && (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}

              {user && user.role === "Subscriber" && (
                <Link to="/user/history">Dashboard</Link>
              )}
            </Menu.Item>

            <Menu.Item icon={<LogoutOutlined />} onClick={logoutHandler}>
              Log Out
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      )}
      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          className="float-end"
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item key="login" icon={<EnterOutlined />} className="float-end">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Header;
