import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Icon, Header, Segment } from "semantic-ui-react";
import Dropzone from "react-dropzone";

class UploadVideoDropzone extends React.Component {
  constructor() {
    super();

    this.onDrop = files => {
      this.setState({ files });
      this.props.uploadVideos(files);
    };

    this.state = {
      files: []
    };
  }

  render() {
    return (
      <Dropzone
        accept="video/mp4"
        maxFiles={1}
        multiple={false}
        onDrop={this.onDrop}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <Segment placeholder style={{marginBottom: '20px', height: '380px'}}>
                <input {...getInputProps()} />
                <Header icon>
                  <Icon name="video file outline" color="grey" />
                  <p>Drag and drop a video file</p>
                  <p>or</p>
                  <p>Click for File Browser</p>
                  <em>Demo accepts videos in mp4 format under 35Mb</em>
                </Header>
              </Segment>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoDropzone);
