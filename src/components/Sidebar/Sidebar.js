import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './Sidebar.less';

const { Sider } = Layout;

class Sidebar extends PureComponent {
  render () {
    return (
      <Sider
        className="sidebar"
        breakpoint="md"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
        >
          <Menu.Item key="project">
            <NavLink
              className="navlink"
              to="/project"
              activeClassName="selected"
            >
              <Icon type="book" />
              <span className="nav-text">Projects</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="shop">
            <NavLink
              className="navlink"
              to="/task"
              activeClassName="selected"
            >
              <Icon type="video-camera" />
              <span className="nav-text">Tasks</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Sidebar;