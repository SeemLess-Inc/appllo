import React from "react";
import { connect } from "react-redux";
import { listVideos } from "../store/actions/videosActions";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/editor/videoListPanel";
import VideoEditorPanel from "../components/editor/videoEditPanel";
import KeyframesList from "../components/editor/keyframesListPanel";
import './AdEditor.css';

class AdEditor extends React.Component {
  componentDidMount() {
    document.title = "Seemless.tv: Ad Editor";
    // Start by getting a list of all videos in the library
    this.props.dispatch(listVideos());
  }

  componentDidUpdate(prevProps) {
    
    if (
      prevProps.videoToAnalyse.video !== null && this.props.videoToAnalyse.video === null
    ) {
      // If we have a successful analysis submission then wait 15 secs then update all videos in the library
      setTimeout(() => {
        this.props.dispatch(listVideos());
      }, 15000);
    }
    if (
      prevProps.videosToUpload.items.length > 0 &&
      this.props.videosToUpload.items.length === 0
    ) {
      // If we have a successful new upload then wait 4 secs then update all videos in the library
      setTimeout(() => {
        this.props.dispatch(listVideos());
      }, 4000);
    }
  }

  render() {
    return (
      <Grid.Row className='light-dividers'>
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
  currentVideo: state.currentVideo,
  videosToUpload: state.videosToUpload,
  videoToAnalyse: state.videoToAnalyse
});
export default connect(mapStateToProps)(AdEditor);
