import React, { PureComponent } from 'react';
import { Row, Col, Button, Spin, notification } from 'antd';

import { promisify, connectTasks } from 'core';
import { TaskModal } from 'components';

import './TaskContainer.less';

class TaskContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isModalLoading: false,
      showModal: false,
      selectedId: undefined
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
      
    });

    promisify(this.props.getTasks, {})
    .finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleAddTask = () => {
    this.setState({
      showModal: true,
      selectedId: undefined
    });
  }

  handleEditTask = (index) => {
    this.setState({
      showModal: true,
      selectedId: index,
      isModalLoading: false
    });
  }

  handleDeleteTask = (index) => {
    this.setState({
      isLoading: true
    });
    
    promisify(this.props.deleteTask, {
      id: index
    })
      .catch(error => {
        notification.error({
          message: error.message || 'Something went wrong'
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleModalOk = (task) => {
    const { selectedId } = this.state;
    if (selectedId !== undefined) {
      this.setState({
        isModalLoading: true
      });

      promisify(this.props.editTask, {
        id: selectedId,
        ...task
      })
        .catch((error) => {
          notification.error({
            message: error.message || 'Something went wrong'
          });
        })
        .finally(() => {
          this.setState({
            isModalLoading: false,
            showModal: false
          });
        });
    } else {
      this.setState({
        isModalLoading: true
      });

      promisify(this.props.addTask, {
        ...task
      })
        .catch((error) => {
          notification.error({
            message: error.message || 'Something went wrong'
          });
        })
        .finally(() => {
          this.setState({
            isModalLoading: false,
            showModal: false
          });
        });
    }
  }

  handleModalCancel = () => {
    this.setState({
      showModal: false
    });
  }

  _renderTask = (task, index) => (
    <Col
      key={index} 
      xs={24}
      sm={12}
      md={12}
      lg={8}
      xxl={6}
    >
      <div className="task">
        <div className="title">{task.title}</div>
        <div className="description">{task.description}</div>
        <div className="action">
          <Button
            type="danger"
            shape="circle"
            icon="delete"
            onClick={() => this.handleDeleteTask(index)}
          />
          <Button
            type="default"
            shape="circle"
            icon="edit"
            onClick={() => this.handleEditTask(index)}
          />
        </div>
      </div>
    </Col>
  )

  render() {
    const { isLoading, showModal, isModalLoading, selectedId } = this.state;
    const { tasks } = this.props;

    return (
      <div className="task-container">
        <h1 className="page-title">
          Your Tasks
        </h1>
        <div className="add-task">
          <Button
            type="primary"
            icon="plus"
            onClick={this.handleAddTask}
          >
            Add Task
          </Button>
        </div>
        
        <Spin spinning={isLoading}>
          <Row gutter={24}>
            {
              tasks.map(this._renderTask)
            }
          </Row>
        </Spin>
        <TaskModal
          title="Task"
          visible={showModal}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          confirmLoading={isModalLoading}
          task={(selectedId !== undefined) ? tasks[selectedId] : undefined}
          destroyOnClose={true}
        />
      </div>
    )
  }
}

export default connectTasks()(TaskContainer);