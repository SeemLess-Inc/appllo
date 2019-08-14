import React from "react";
import { Header, Grid, Icon, Divider, Item, Checkbox } from "semantic-ui-react";

const Keyframes = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={14}>
        <Header size="medium">Keyframes</Header>
      </Grid.Column>
      <Grid.Column width={2} textAlign="right">
        <Icon name="plus circle" />
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Grid.Row style={{ margin: 14 }}>
      <Item.Group>
        <Item>
          <Checkbox label=" " />
          <Item.Content>
            <Item.Header as="a">Keyframe 1</Item.Header>
            <Item.Meta>07:13 - 07:21</Item.Meta>
            <Item.Extra>age 20-29, white, female, standing</Item.Extra>
          </Item.Content>
        </Item>
        <Divider />
        <Item>
          <Checkbox label=" " />
          <Item.Content>
            <Item.Header as="a">Keyframe 2</Item.Header>
            <Item.Meta>10:46 - 10:51</Item.Meta>
            <Item.Extra>age 20-29, white, female, standing</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Grid.Row>
  </Grid>
);

export default Keyframes;
