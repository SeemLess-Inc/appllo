import React from "react";
import { connect } from "react-redux";
import { listVideos } from "../store/actions/videosActions";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/editor/videoListPanel";
import VideoEditorHeader from "../components/editor/videoEditPanel/VideoEditorHeader";
import VideoApp from "../components/editor/videoEditPanel/VideoApp";
import Framer from "../components/editor/videoEditPanel/Framer";
import AdAssets from "../components/editor/videoEditPanel/AdAssets";
import KeyframesList from "../components/editor/keyframesListPanel";
//import './App.css';

class AdEditor extends React.Component {

  componentDidMount() {
    // Start by getting a list of all videos in the library
    this.props.dispatch(listVideos());
  }

  render() {
    let videoPanels;
    if (this.props.currentVideo.id === "") {
      videoPanels = null;
    } else {
      videoPanels = (
        <div>
          <VideoApp />
          <Framer />
          <AdAssets />
        </div>
      );
    }

    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <VideosList />
        </Grid.Column>
        <Grid.Column width={8}>
          <VideoEditorHeader />
          {videoPanels}
        </Grid.Column>
        <Grid.Column width={4}>
          <KeyframesList />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});
export default connect(mapStateToProps)(AdEditor);
