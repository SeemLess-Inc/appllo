import React from "react";
import { Header, Grid, Icon, Divider, Item } from "semantic-ui-react";
import KeyframeItem from "./KeyframeItem";

function KeyframesList() {
  const keyframes = [
    {
      id: 0,
      title: "Keyframe 1",
      timespan: "07:13-07:21",
      description: "age 20-29, white, female, standing"
    },
    {
      id: 1,
      title: "Keyframe 2",
      timespan: "10:46-10:51",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 2,
      title: "Keyframe 3",
      timespan: "27:13-27:21",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 3,
      title: "Keyframe 4",
      timespan: "30:23-30:21",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 4,
      title: "Keyframe 5",
      timespan: "07:13-07:21",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 5,
      title: "Keyframe 6",
      timespan: "07:13-07:21",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 6,
      title: "Keyframe 7",
      timespan: "07:13-07:21",
      description: "age 20-20, white, female, standing"
    },
    {
      id: 7,
      title: "Custom Keyframe 8",
      timespan: "47:13",
      description: "-"
    }
  ];

  return (
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
        <Item.Group divided>
          {keyframes.map(keyframe => {
            return <KeyframeItem keyframe={keyframe} key={keyframe.id} />;
          })}
        </Item.Group>
      </Grid.Row>
    </Grid>
  );
}

export default KeyframesList;
