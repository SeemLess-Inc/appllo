import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Button, Icon } from "semantic-ui-react";
import Dropzone from "react-dropzone";

class UploadVideoPanel extends React.Component {
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
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button icon='upload' size='tiny' color='blue' basic circular compact/>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoPanel);
