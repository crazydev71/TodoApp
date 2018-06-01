import React, { PureComponent } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Sidebar, PrivateRoute } from 'components';

import ProjectContainer from 'containers/ProjectContainer/ProjectContainer';
import TaskContainer from 'containers/TaskContainer/TaskContainer';

import './MainLayout.less';

const { Content } = Layout;


class MainLayout extends PureComponent {
  render () {
    return (
      <Layout className="layout">
        <Sidebar/>
        <Layout className>
          <Header/>
          <Content className="layout__content">
            <Switch>
              <PrivateRoute path="/project" exact component={ProjectContainer}/>
              <PrivateRoute path="/task" exact component={TaskContainer}/>
              <Redirect to="/project" from="/"/>
              <Redirect to="/404"/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout;