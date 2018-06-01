import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authActionCreators } from './actions';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(authActionCreators, dispatch)
};

export function connectAuth(
  configMapStateToProps = mapStateToProps,
  configMapDispatchToProps = mapDispatchToProps
) {
  return connect(
    configMapStateToProps,
    configMapDispatchToProps,
  );
}
