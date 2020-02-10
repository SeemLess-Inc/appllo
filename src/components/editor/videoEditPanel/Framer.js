import React from "react";
import { Menu, Grid, Divider, Header, Segment } from "semantic-ui-react";

const Framer = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Menu secondary>
          <Header fitted sub header as="h3">
            Framer
          </Header>
          <Menu.Menu position="right">
            <Menu.Item>Keyframe 3</Menu.Item>
            <Menu.Item>33 sec</Menu.Item>
            <Menu.Item header>33:12 - 34:45</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment style={{height: '80px'}}></Segment>
  
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Framer;
