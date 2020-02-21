import React from "react";
import { connect } from "react-redux";
import VideoEditorHeader from "./VideoEditorHeader";
import VideoApp from "./VideoApp";
import Framer from "./Framer";
import AdAssets from "./AdAssets";
import { Divider, Grid, Container, Dimmer, Loader } from "semantic-ui-react";

import { Player, ControlBar } from 'video-react';
import { setPlayer } from "../../../store/actions/currentVideoAction";
import { seekToKeyFrame } from "../../../store/actions/keyframesActions";
import VideoKeyframeTag from "./VideoKeyframeTag";

import UploadVideoDropzone from "./UploadVideoDropzone"
import "./VideoApp.css"
var array = [];
var videoDuration = null;
var extracting = false;

class VideoEditorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { seekToKeyframe, player } = this.props;

    if (!player) {
      dispatch(setPlayer(this.player))
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      this.instance.appendChild(s);
      this.extractFrames()
    }
    if (typeof seekToKeyframe === 'number') {
      this.player.play();
      this.player.pause();
      this.player.seek(seekToKeyframe);
      dispatch(seekToKeyFrame(null))
    }
  }

  async extractFrames() {
    extracting = true;
    let videoBlob = await fetch(this.props.currentVideo.src).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);

    var video = document.createElement('video');
    video.src = videoObjectUrl;
    video.setAttribute("height", "500");
    video.setAttribute("width", "700");

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    function initCanvas(e) {
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
    }

    function drawFrame(e) {
      ctx.drawImage(this, 0, 0);
      canvas.toBlob(saveFrame, 'image/jpeg');
    }

    function saveFrame(blob) {
      array.push(blob);
    }

    function revokeURL(e) {
      URL.revokeObjectURL(this.src);
    }

    const onend = e => {
      var img;
      var playerWidth = document.getElementById("player").offsetWidth
      for (var i = 0; i < array.length; i++) {
        img = new Image();
        var img = document.createElement("IMG");
        img.onload = revokeURL;
        img.src = URL.createObjectURL(array[i]);
        img.setAttribute("src", URL.createObjectURL(array[i]));
        img.setAttribute("width", Math.floor(playerWidth / array.length));
        img.setAttribute("height", "70");
        img.setAttribute("display", "inline-block");
        var videoFramDiv = document.getElementById('videoFrames');
        videoFramDiv.appendChild(img);
      }
      extracting = false;
      URL.revokeObjectURL(this.src);
    }

    video.muted = true;

    video.addEventListener('loadedmetadata', initCanvas, false);
    video.addEventListener('timeupdate', drawFrame, false);
    video.addEventListener('ended', onend, false);
    video.play();
  }

  playerProp(prop) {
    if (this.player) {
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

  selectKeyFrame = (index) => {
    function revokeURL(e) {
      URL.revokeObjectURL(this.src);
    }

    var frameContainer = document.createElement("DIV");
    frameContainer.setAttribute("height", "150");
    frameContainer.setAttribute("width", "150");
    frameContainer.style.marginTop = "10px";
    frameContainer.style.marginBottom = "10px";
    frameContainer.style.borderRadius = "4px";

    var img = document.createElement("IMG");
    img.onload = revokeURL;
    img.src = URL.createObjectURL(array[index]);
    img.setAttribute("src", URL.createObjectURL(array[index]));
    img.setAttribute("width", "150");
    img.setAttribute("height", "100");
    img.style.borderRadius = "4px";
    var selectedKeyFrameDiv = document.getElementById('selectedKeyFrame');
    selectedKeyFrameDiv.innerHTML = '';
    frameContainer.appendChild(img)
    selectedKeyFrameDiv.appendChild(frameContainer);
  }

  render() {
    const { currentVideo, keyframes } = this.props;
    let videoPanels;
    if (this.props.currentVideo.id !== "") {
      videoPanels = (
        <div>
          {/* <VideoApp /> */}
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Container>
                  <div className='video-tags-container' ref={el => (this.instance = el)}>
                    <div className='video-tags'>
                      {this.playerProp('hasStarted') && keyframes.length && keyframes.map((keyframe, i) => (
                        <VideoKeyframeTag key={i} keyframe={keyframe} player={this.player} />
                      ))}
                    </div>
                  </div>
                  <div id="player">
                    <Player
                      playsInline
                      src={currentVideo.src}
                      ref={player => {
                        this.player = player;
                      }}
                    ><ControlBar autoHide={false} />
                    </Player>
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
            <Framer 
              extracting={extracting}
              array={array}
              playerWidth={this.props.player && document.getElementById("player").offsetWidth}
              selectKeyFrame={(index) => this.selectKeyFrame(index)}
            />
          <AdAssets />
        </div>
      );
    } else {
      videoPanels = (
        <div>
          <UploadVideoDropzone />
            <Framer 
              extracting={extracting}
              array={array}
              playerWidth={this.props.player && document.getElementById("player").offsetWidth}
              selectKeyFrame={(index) => this.selectKeyFrame(index)}
            />
          <AdAssets />
        </div>
      )
    }

    return (
      <div>
        <VideoEditorHeader />
        {videoPanels}
      </div>
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
//const mapDispatchToProps = { selectVideo }

export default connect(
  mapStateToProps
  //  mapDispatchToProps
)(VideoEditorPanel);
