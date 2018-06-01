import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store, authActionCreators, connectAuth, promisify } from 'core';
import { PrivateRoute } from 'components';

import LoginContainer from 'containers/LoginContainer/LoginContainer';
import MainLayout from 'containers/MainLayout/MainLayout';
import NotFound from 'containers/NotFound/NotFound';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentWillMount() {
    this.initApp();
  }

  initApp() {
    this.setState({
      isLoading: true
    });

    promisify(this.props.checkAuth, {})
    .catch(console.log)
    .finally(() => {
      this.setState({
        isLoading: false
      });
    })
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return null;
    } else {
      return (
        <div className="App">
          <Router>
            <Switch>
              <Route path="/404" exact component={NotFound}/>
              <Route path="/login" exact component={LoginContainer}/>
              <PrivateRoute path="/" component={MainLayout}/>
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  const { checkAuth } = authActionCreators;

  return bindActionCreators({
    checkAuth,
  }, dispatch);
}

const WrappedApp = connectAuth(() => ({}), mapDispatchToProps)(App);

class AppContainer extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <WrappedApp/>
      </Provider>
    );
  }
}
export default AppContainer;
