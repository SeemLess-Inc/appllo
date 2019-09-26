import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import VideoPlayer from "react-video-js-player";

class VideoApp extends Component {
  player = {};
  state = {
    video: {
      src:
        "https://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/Three+Active+Happy+Adult+Girlfriends+Stock+Footage+Video.mp4"
      //            poster: "http://www.example.com/path/to/video_poster.jpg"
    }
  };

  /*
  // Create an object to render
  const o = {};
  o.id = props.currentVideo.id;
  o.title = props.currentVideo.id;
  o.uploadedDate = props.currentVideo.hasOwnProperty("uploadedDate")
    ? props.currentVideo.uploadedDate
    : "Unknown date";
  o.thumbnail = props.currentVideo.hasOwnProperty("thumbnail")
    ? props.currentVideo.thumbnail
    : "./video.png";
  o.state = "Uploaded";

  // Show/Hide video and disable Save button
  let videoApp;
  if (o.id === "") {
    o.title = "Choose a video from the list";
    o.uploadedDate = "";
    videoApp = <div></div>;
  } else {
    videoApp = <VideoApp></VideoApp>;
  }
*/

  onPlayerReady(player) {
    console.log("Player is ready: ", player);
    this.player = player;
  }

  onVideoPlay(duration) {
    console.log("Video played at: ", duration);
  }

  onVideoPause(duration) {
    console.log("Video paused at: ", duration);
  }

  onVideoTimeUpdate(duration) {
    console.log("Time updated: ", duration);
  }

  onVideoSeeking(duration) {
    console.log("Video seeking: ", duration);
  }

  onVideoSeeked(from, to) {
    console.log(`Video seeked from ${from} to ${to}`);
  }

  onVideoEnd() {
    console.log("Video ended");
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Container>
              <VideoPlayer
                controls={true}
                src={this.state.video.src}
                poster={this.state.video.poster}
                //width="auto"
                //height="auto"
                //onReady={this.onPlayerReady.bind(this)}
                //onPlay={this.onVideoPlay.bind(this)}
                //onPause={this.onVideoPause.bind(this)}
                //onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                //onSeeking={this.onVideoSeeking.bind(this)}
                //onSeeked={this.onVideoSeeked.bind(this)}
                //onEnd={this.onVideoEnd.bind(this)}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});

export default connect(mapStateToProps)(VideoApp);
