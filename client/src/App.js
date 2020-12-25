import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store";
//Components and files
import Login from "./components/Login";
import PrivateRoute from "./components/routering/PrivateRoute";
import Dashboardadmin from "./components/Dashboardadmin";
import Dashboarduser from "./components/Dashboarduser";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utlis/setAuthToken";

import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />

          <Switch>
            <PrivateRoute
              exact
              path="/dashboardadmin"
              component={Dashboardadmin}
            />
            <PrivateRoute
              exact
              path="/dashboarduser"
              component={Dashboarduser}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
