import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

class TaskModal extends PureComponent {
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
    const { task, onOk, onCancel, ...props } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        {...props}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item label="Task Title">
            {
              getFieldDecorator('title', {
                rules: [
                  { required: true, message: 'Please input the task title!' },
                  { max: 50, message: 'Task title cannot be longer than 50 characters'}
                ],
                initialValue: task ? task.title : ''
              })(
                <Input placeholder="Task Title" />
              )
            }
          </Form.Item>
          <Form.Item label="Task Description">
            {
              getFieldDecorator('description', {
                rules: [
                  { required: true, message: 'Please input the task description!' },
                  { max: 140, message: 'Task title cannot be longer than 140 characters'}
                ],
                initialValue: task ? task.description : ''
              })(
                <TextArea placeholder="Task Description" style={{minHeight: '150px'}}/>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TaskModal);