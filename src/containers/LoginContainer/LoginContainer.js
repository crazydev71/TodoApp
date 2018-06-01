import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { Form, Icon, Input, Button, Checkbox , notification } from 'antd';
import { authActionCreators, connectAuth, promisify } from 'core';

import './LoginContainer.less';

const FormItem = Form.Item;

class LoginContainer extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { validateFields } = this.props.form;

    const { login, history } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        });

        promisify(login, values)
        .then(() => {

          this.setState({
            isLoading: false
          }, () => {
            history.replace('/project');
          });
        })
        .catch((error) => {
          notification.error({ message: error.message });
          
          this.setState({ isLoading: false });
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )
            }
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.isLoading}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const { login } = authActionCreators;

  return bindActionCreators({
    login
  }, dispatch);
}

export default compose(
  connectAuth(() => ({}), mapDispatchToProps),
  Form.create()
) (LoginContainer);