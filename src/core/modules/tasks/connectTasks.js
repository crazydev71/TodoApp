import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tasksActionCreators } from './actions';

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(tasksActionCreators, dispatch)
};

export function connectTasks(
  configMapStateToProps = mapStateToProps,
  configMapDispatchToProps = mapDispatchToProps
) {
  return connect(
    configMapStateToProps,
    configMapDispatchToProps,
  );
}
