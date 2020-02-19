import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import { Player, ControlBar } from 'video-react';
import { setPlayer } from "../../../store/actions/currentVideoAction";
import { seekToKeyFrame } from "../../../store/actions/keyframesActions";
import VideoKeyframeTag from "./VideoKeyframeTag";
import "../../../../node_modules/video-react/dist/video-react.css"
import "./VideoApp.css"
var array = [];
var videoDuration = null;
class VideoApp extends Component {
  constructor(props) {
    super(props);
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    
    const { dispatch } = this.props;
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    dispatch(setPlayer(this.player));
  }

  componentDidUpdate() {
    const { seekToKeyframe, dispatch, player } = this.props;
    if (!player) {
      dispatch(setPlayer(this.player))
    }
    if (typeof seekToKeyframe === 'number') {
      this.player.play();
      this.player.pause();
      this.player.seek(seekToKeyframe);
      dispatch(seekToKeyFrame(null))
    }
  }

  playerProp(prop) {
    if(this.player) {
      return this.player.video.props.player[prop];
    } else {
      return undefined
    }
  }

  handleStateChange(state) {
    this.setState({
      player: state
    });
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  render() {
    const { currentVideo, keyframes } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Container>
              <div className='video-tags-container' ref={el => (this.instance = el)}>
                <div className='video-tags'>
                  { this.playerProp('hasStarted') && keyframes.length && keyframes.map((keyframe, i) => (
                    <VideoKeyframeTag key={i} keyframe={keyframe} player={this.player} />
                  ))}
                </div>
              </div>
              <Player
                playsInline
                src={currentVideo.src}
                ref={player => {
                  this.player = player;
                }}
              ><ControlBar autoHide={false} />
              </Player>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items,
  currentKeyframeId: state.keyframes.currentKeyframe[0],
  currentKeyframeFrameTime: state.keyframes.currentKeyframe[1].frame_time,
  player: state.currentVideo.player,
  seekToKeyframe: state.keyframes.seekToKeyframe
});

export default connect(mapStateToProps)(VideoApp);
