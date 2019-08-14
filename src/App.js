import React from "react";
import { Grid } from "semantic-ui-react";
import TopMenu from "./components/TopMenu"

const App = () => (
  <Grid fluid celled style={{ marginTop: 0 }}>
    <Grid.Row>
      <Grid.Column width={16}>
        <TopMenu />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={4}>Videos</Grid.Column>
      <Grid.Column width={8}>Video</Grid.Column>
      <Grid.Column width={4}>Keyframes</Grid.Column>
    </Grid.Row>
  </Grid>
);

export default App;
