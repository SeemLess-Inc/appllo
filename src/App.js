import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import TopMenu from "./components/TopMenu";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import AdEditor from "./views/AdEditor";
import "./assets/fomantic/dist/semantic.css";
//import './App.css';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Grid fluid celled style={{ marginTop: 0 }}>
          <Grid.Row>
            <Grid.Column width={16}>
              <TopMenu />
            </Grid.Column>
          </Grid.Row>
          <Route path="/" exact component={Home} />
          <Route path="/edit/" component={AdEditor} />
          <Route path="/dashboard/" component={Dashboard} />
        </Grid>
      </Router>
    );
  }
}
export default App;
