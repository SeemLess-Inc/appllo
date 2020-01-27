import React from "react";
import { Button, Grid, Menu, Divider, Header, Segment } from "semantic-ui-react";

const AdAssets = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Menu secondary>
        <Header fitted sub header as="h3">
            Assets
          </Header>
          <Menu.Menu position="right">
          <Button icon='plus' size='tiny' color='blue' basic circular compact/>
          </Menu.Menu>
        </Menu>
        <Segment style={{height: '100px'}}></Segment>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default AdAssets;
