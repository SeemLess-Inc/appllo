import React from "react";
import { Header, Icon, Grid, Item, Divider } from "semantic-ui-react";

const VideosList = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={14}>
        <Header size="medium">Videos (8)</Header>
      </Grid.Column>
      <Grid.Column width={2} textAlign="right">
        <Icon name="upload" />
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Grid.Row style={{ margin: 14 }}>
      <Item.Group>
        <Item>
          <Item.Image src="./video.png" size="tiny" />
          <Item.Content>
            <Item.Header as="a">Big Little Lies</Item.Header>
            <Item.Meta>May 6, 2019</Item.Meta>
            <Item.Extra>Uploaded</Item.Extra>
          </Item.Content>
        </Item>
        <Divider />
        <Item>
          <Item.Image src="./video.png" size="tiny" />
          <Item.Content>
            <Item.Header as="a">Big Little Lies</Item.Header>
            <Item.Meta>May 6, 2019</Item.Meta>
            <Item.Extra>Uploaded</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Grid.Row>
  </Grid>
);

export default VideosList;
