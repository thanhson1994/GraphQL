import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <div>
          <Menu mode="horizontal" theme="dark">
            <Menu.Item key="Home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="Posts">
              <Link to="/posts">Posts</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
