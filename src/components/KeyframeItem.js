import React from "react";
import { Item, Checkbox } from "semantic-ui-react";

function KeyframeItem(props) {
  const keyframe = props.keyframe;

  return (
    <Item>
      <Checkbox label=" " />
      <Item.Content>
        <Item.Header as="a">{keyframe.title}</Item.Header>
        <Item.Meta>{keyframe.timespan}</Item.Meta>
        <Item.Extra>{keyframe.description}</Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default KeyframeItem;
