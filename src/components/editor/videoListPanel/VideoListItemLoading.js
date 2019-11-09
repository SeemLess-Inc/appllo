import React from "react";
import { connect } from "react-redux";
import { Item, Loader } from "semantic-ui-react";

function VideoListItemloading(props) {
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

  let videoThumbnail = "./video.png";
  let videoName = "New video is uploading...";

  return (
    <Item>
      <Item.Image src={videoThumbnail} size="tiny" />
      <Item.Content>
        <Item.Header as="a">{videoName}</Item.Header>
        <Item.Meta></Item.Meta>
        <Item.Extra>
        <Loader active inline />
        </Item.Extra>
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
export default connect()(VideoListItemloading);
//  mapStateToProps,
//  mapDispatchToProps
