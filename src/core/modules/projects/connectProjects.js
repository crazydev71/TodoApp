import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { projectsActionCreators } from './actions';

const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(projectsActionCreators, dispatch)
};

export function connectProjects(
  configMapStateToProps = mapStateToProps,
  configMapDispatchToProps = mapDispatchToProps
) {
  return connect(
    configMapStateToProps,
    configMapDispatchToProps,
  );
}
