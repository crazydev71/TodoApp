import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

class ProjectModal extends PureComponent {
  handleOk = () => {
    const { validateFields } = this.props.form;

    validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { project, onOk, onCancel, ...props } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        {...props}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item label="Project Title">
            {
              getFieldDecorator('title', {
                rules: [
                  { required: true, message: 'Please input the project title!' },
                  { max: 50, message: 'Project title cannot be longer than 50 characters'}
                ],
                initialValue: project ? project.title : ''
              })(
                <Input placeholder="Project Title" />
              )
            }
          </Form.Item>
          <Form.Item label="Project Description">
            {
              getFieldDecorator('description', {
                rules: [
                  { required: true, message: 'Please input the project description!' },
                  { max: 140, message: 'Project title cannot be longer than 140 characters'}
                ],
                initialValue: project ? project.description : ''
              })(
                <TextArea placeholder="Project Description" style={{minHeight: '150px'}}/>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProjectModal);