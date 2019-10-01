import React from "react";
import { connect } from "react-redux";
import { listVideos } from "../store/actions/videosActions";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/editor/videoListPanel";
import VideoEditorPanel from "../components/editor/videoEditPanel";
import KeyframesList from "../components/editor/keyframesListPanel";
//import './App.css';

class AdEditor extends React.Component {

  componentDidMount() {
    document.title = "Seemless.tv: Ad Editor";
    // Start by getting a list of all videos in the library
    this.props.dispatch(listVideos());
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <VideosList />
        </Grid.Column>
        <Grid.Column width={8}>
          <VideoEditorPanel />
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
