import React from "react";
import { Menu, Grid, Header } from "semantic-ui-react";
import FramerScrubber from "./FramerScrubber";

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
        <FramerScrubber />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Framer;
