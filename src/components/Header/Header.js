import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { promisify, connectAuth, authActionCreators } from 'core';
import { Layout, Avatar, Button } from 'antd';

import './Header.less';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handleLogout = () => {
    this.setState({
      isLoading: true
    });
    promisify(this.props.logout, {});
  }

  render() {
    const { auth } = this.props;
    return (
      <Layout.Header className="layout__header">
        <div className="layout__header--user">
          <Avatar
            size="large"
            icon="user"
          />
          &nbsp;{auth.user.username}&nbsp;
          <Button
            className="btn-logout"
            type="primary"
            shape="circle"
            icon="poweroff"
            size="large"
            onClick={this.handleLogout}
            loading={this.state.isLoading}
          />
        </div>
      </Layout.Header>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const { logout } = authActionCreators;

  return bindActionCreators({
    logout
  }, dispatch);
}

export default connectAuth(undefined, mapDispatchToProps)(Header);