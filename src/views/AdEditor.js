import React from "react";

import { connect } from "react-redux";
import { listVideos } from "../store/actions/videosActions";

import { Grid } from "semantic-ui-react";

import VideosList from "../components/editor/videoListPanel";
import VideoEditor from "../components/editor/videoEditPanel/VideoEditor";
import Framer from "../components/editor/videoEditPanel/Framer";
import AdAssets from "../components/editor/videoEditPanel/AdAssets";
import KeyframesList from "../components/editor/keyframesListPanel";
//import './App.css';

class AdEditor extends React.Component {
  componentDidMount() {
    // Get a list of all videos in the library
        this.props.dispatch(listVideos());
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <VideosList />
        </Grid.Column>
        <Grid.Column width={8}>
          <VideoEditor />
          <Framer />
          <AdAssets />
        </Grid.Column>
        <Grid.Column width={4}>
          <KeyframesList />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos.items,
  loading: state.videos.loading,
  error: state.videos.error
});
export default connect(mapStateToProps)(AdEditor);
