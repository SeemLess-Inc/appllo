import React from "react";
import { connect } from 'react-redux';
import { selectVideo } from '../../../store/actions/selectVideoAction'
import { Item } from "semantic-ui-react";

function VideoListItem (props) {

  // Create an object to render
  const o ={}
  o.id = props.video
  o.title = props.video
  o.thumbnail = "./video.png"
  o.uploadedDate = "Unknown date"
  o.state = "Uploaded"

  // Invoking the actions via props.dispatch()
  const selectNewVideo = () => props.dispatch(selectVideo(props.video));
/*
  function selectVideo(e) {
    console.log("choose: " + o.id)
   this.props.selectVideo(o.id)
  }    
  */

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

// const increment = () => ({ type: 'INCREMENT' })
// const decrement = () => ({ type: 'DECREMENT' })
// const reset = () => ({ type: 'RESET' })
// const selectVideo = (id) => ({ type: 'SELECT_VIDEO', payload: id })


const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});
const mapDispatchToProps = { selectVideo }

//export default VideoListItem;
export default connect(
//  mapStateToProps,
//  mapDispatchToProps
)(VideoListItem)

