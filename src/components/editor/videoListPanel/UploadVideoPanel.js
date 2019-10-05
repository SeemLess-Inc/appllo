import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Modal, Button, Icon, Header, Segment } from "semantic-ui-react";
import Dropzone from "react-dropzone";

class UploadVideoPanel extends React.Component {
  constructor() {
    super();

    this.onDrop = files => {
      this.setState({ files });
      this.props.uploadVideos(files);

      // close the modal
      this.setState({ modalOpen: false });
    };

    this.state = {
      modalOpen: false,
      files: []
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} ({file.size} bytes)
      </li>
    ));

    return (
      <Modal
        trigger={
          <Button
            animated="vertical"
            onClick={() => {
              this.setState({ modalOpen: true });
            }}
          >
            <Button.Content hidden>Upload</Button.Content>
            <Button.Content visible>
              <Icon name="upload" />
            </Button.Content>
          </Button>
        }
        closeIcon
        centered={false}
        size="tiny"
        open={this.state.modalOpen}
        onClose={() => {
          this.setState({ modalOpen: false });
        }}
      >
        <Modal.Header>Upload a video</Modal.Header>
        <Modal.Content>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <Segment placeholder>
                    <input {...getInputProps()} />
                    <Header icon>
                      <Icon name="video file outline" />
                      <p>Drag and drop a video file</p>
                      <p>or</p>
                      <p>Click for File Browser</p>
                    </Header>
                  </Segment>
                </div>
              </section>
            )}
          </Dropzone>
          <aside>
            <ul>{files}</ul>
          </aside>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoPanel);
