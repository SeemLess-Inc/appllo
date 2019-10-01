import React from "react";
import { Grid } from "semantic-ui-react";
import ShowsList from "../components/dashboard/ShowsList";
import ShowMetrics from "../components/dashboard/ShowMetrics";

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = "Seemless.tv: Dashboard";
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <ShowsList />
        </Grid.Column>
        <Grid.Column width={12}>
          <ShowMetrics />
        </Grid.Column>
      </Grid.Row>
    );
  }
}
export default Dashboard;
