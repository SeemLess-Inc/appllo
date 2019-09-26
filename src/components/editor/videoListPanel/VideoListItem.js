import React from "react";
import { connect } from 'react-redux';
import { selectVideo } from '../../../store/actions/currentVideoAction'
import { Item } from "semantic-ui-react";

function VideoListItem (props) {

  // Create an object to render
  let o = {}
  o.id = props.video
  o.title = props.video
  o.thumbnail = "./video.png"
  o.uploadedDate = "Unknown date"
  o.state = "Uploaded"

  // Invoking the actions via props.dispatch()
  const selectNewVideo = () => props.dispatch(selectVideo(props.video));

  return (
    <Item onClick={selectNewVideo}>
      <Item.Image src={o.thumbnail} size="tiny" />
      <Item.Content>
        <Item.Header as="a">{o.title}</Item.Header>
        <Item.Meta>{o.uploadedDate}</Item.Meta>
        <Item.Extra>{o.state}</Item.Extra>
      </Item.Content>
    </Item>
  );
}

/*
const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});
const mapDispatchToProps = { selectVideo }
*/
//export default VideoListItem;
export default connect(
//  mapStateToProps,
//  mapDispatchToProps
)(VideoListItem)

