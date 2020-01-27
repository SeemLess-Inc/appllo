import React from "react";
import { connect } from 'react-redux';
import { selectVideo } from '../../../store/actions/currentVideoAction'
import { analyseVideo } from '../../../store/actions/analyseVideoActions'
import { Header, Item } from "semantic-ui-react";

function VideoListItem (props) {

/*
video.
  analytics: "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/get_analytics/ApiTest.mp4.json"
  duration: ""
  id: "ApiTest.mp4"
  src: "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/ApiTest.mp4"
  thumbnail: ""
  title: "ApiTest.mp4"
  uploadedDate: ""
*/

let o = props.video
let videoState;

if (props.video.analytics === ""){
  videoState = "Analysis in progress"
  // request analysis
  props.dispatch(analyseVideo(props.video));
}
else{
  videoState = "Analyzed"
}

let videoThumbnail;
if (props.video.thumbnail === ""){
  videoThumbnail = "./video.png"
}
else{
  videoThumbnail = props.video.thumbnail
}

  // Invoking the actions via props.dispatch()
  const selectNewVideo = () => props.dispatch(selectVideo(props.video));

  return (
    <Item onClick={selectNewVideo}>
      <Item.Image src={videoThumbnail} size="tiny" />
      <Item.Content>
        <Header size='tiny' as="a">{o.title}</Header>
        <Item.Meta>{o.uploadedDate}</Item.Meta>
        <Item.Extra>{videoState}</Item.Extra>
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

