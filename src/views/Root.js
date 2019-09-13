import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Grid } from "semantic-ui-react";
import TopMenu from "../components/TopMenu";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AdEditor from "./AdEditor";
import Error404 from "./Error404";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Grid celled style={{ marginTop: 0 }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <TopMenu />
          </Grid.Column>
        </Grid.Row>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/edit/" component={AdEditor} />
          <Route path="/dashboard/" component={Dashboard} />
          <Route component={Error404} />
        </Switch>
      </Grid>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
