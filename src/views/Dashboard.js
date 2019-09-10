import React from "react";
import { Grid } from "semantic-ui-react";
import ShowsList from '../components/ShowsList'
import ShowMetrics from '../components/ShowMetrics'

class Dashboard extends React.Component {
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
