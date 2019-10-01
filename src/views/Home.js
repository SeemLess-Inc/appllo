import React from "react";
import { Grid } from "semantic-ui-react";

class Home extends React.Component {
  componentDidMount() {
    document.title = "Seemless.tv";
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <h4>Home Page</h4>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Home;
