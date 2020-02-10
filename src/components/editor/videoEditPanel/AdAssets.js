import React from "react";
import { Button, Grid, Menu, Divider, Header, Segment } from "semantic-ui-react";

const AdAssets = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Menu secondary>
        <Header fitted sub header as="h3">
            Media Assets
          </Header>
          <Menu.Menu position="right">
          <Button basic circular icon='plus' size='tiny' color='blue'  compact onClick={() => (alert('Coming soon'))} />
          </Menu.Menu>
        </Menu>
        <Segment style={{height: '80px'}}></Segment>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default AdAssets;
