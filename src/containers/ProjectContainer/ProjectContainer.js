import React, { PureComponent } from 'react';
import { Row, Col, Button, Spin, notification } from 'antd';

import { promisify, connectProjects } from 'core';
import { ProjectModal } from 'components';

import './ProjectContainer.less';

class ProjectContainer extends PureComponent {
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

    promisify(this.props.getProjects, {})
    .finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleAddProject = () => {
    this.setState({
      showModal: true,
      selectedId: undefined
    });
  }

  handleEditProject = (index) => {
    this.setState({
      showModal: true,
      selectedId: index,
      isModalLoading: false
    });
  }

  handleDeleteProject = (index) => {
    this.setState({
      isLoading: true
    });

    promisify(this.props.deleteProject, {
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

  handleModalOk = (project) => {
    const { selectedId } = this.state;
    if (selectedId !== undefined) {
      this.setState({
        isModalLoading: true
      });

      promisify(this.props.editProject, {
        id: selectedId,
        ...project
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

      promisify(this.props.addProject, {
        ...project
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

  _renderProject = (project, index) => (
    <Col
      key={index} 
      xs={24}
      sm={12}
      md={12}
      lg={8}
      xxl={6}
    >
      <div className="project">
        <div className="title">{project.title}</div>
        <div className="description">{project.description}</div>
        <div className="action">
          <Button
            type="danger"
            shape="circle"
            icon="delete"
            onClick={() => this.handleDeleteProject(index)}
          />
          <Button
            type="default"
            shape="circle"
            icon="edit"
            onClick={() => this.handleEditProject(index)}
          />
        </div>
      </div>
    </Col>
  )

  

  render() {
    const { isLoading, showModal, isModalLoading, selectedId } = this.state;
    const { projects } = this.props;

    return (
      <div className="project-container">
        <h1 className="page-title">
          Your Projects
        </h1>
        <div className="add-project">
          <Button
            type="primary"
            icon="plus"
            onClick={this.handleAddProject}
          >
            Add Project
          </Button>
        </div>
        
        <Spin spinning={isLoading}>
          <Row gutter={24}>
            {
              projects.map(this._renderProject)
            }
          </Row>
        </Spin>
        <ProjectModal
          title="Project"
          visible={showModal}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          confirmLoading={isModalLoading}
          project={(selectedId !== undefined) ? projects[selectedId] : undefined}
          destroyOnClose={true}
        />
      </div>
    )
  }
}

export default connectProjects()(ProjectContainer);