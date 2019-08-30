import React from "react";
import { Item } from "semantic-ui-react";

function VideoListItem(props) {
  const video = props.video;

  return (
    <Item>
      <Item.Image src={video.thumbnail} size="tiny" />
      <Item.Content>
        <Item.Header as="a">{video.title}</Item.Header>
        <Item.Meta>{video.uploadedDate}</Item.Meta>
        <Item.Extra>Uploaded</Item.Extra>
      </Item.Content>
    
    </Item>
  );
}

export default VideoListItem;


