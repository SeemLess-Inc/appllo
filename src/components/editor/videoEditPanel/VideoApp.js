import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import VideoPlayer from "react-video-js-player";

// const END_POINT = "https://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/";
class VideoApp extends Component {
  //  video_src = this.props.currentVideo.src; // END_POINT + this.props.currentVideo.id; // "ApiTest.mp4"
  //  video_poster = "http://www.example.com/path/to/video_poster.jpg";

  player = {};

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
    const { currentVideo } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Container>
              <VideoPlayer
                controls={true}
                src={currentVideo.src}
                //poster={this.video_poster}
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
