import React from "react";
import { connect } from "react-redux";
import VideoEditorHeader from "./VideoEditorHeader";
import VideoApp from "./VideoApp";
import Framer from "./Framer";
import AdAssets from "./AdAssets";
import { Divider } from "semantic-ui-react";
import UploadVideoDropzone from "./UploadVideoDropzone"

class VideoEditorPanel extends React.Component {
  render() {

    let videoPanels;
    if (this.props.currentVideo.id !== "") {
      videoPanels = (
        <div>
          <VideoApp />
          <Framer />
          <AdAssets />
        </div>
      );
    } else {
      videoPanels = (
        <div>
          <UploadVideoDropzone />
          <Framer />
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
  currentVideo: state.currentVideo
});
//const mapDispatchToProps = { selectVideo }

export default connect(
  mapStateToProps
  //  mapDispatchToProps
)(VideoEditorPanel);
