import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../store/actions/uploadVideoActions";
import { Icon, Header, Segment, Button, Divider, Step } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Modal from 'react-modal';
import './styles.css';
 const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    borderColor: '#dedede'
  }
}; 

class UploadModal extends React.Component {
  constructor() {
    super();

    this.onDrop = files => {
      this.closeModal()
      this.setState({ files });
      this.props.uploadVideos(files);
    };

    this.state = {
      files: [],
      modalIsOpen: true,
      currentStep: 1
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onNext = () => {
    this.setState({ currentStep: this.state.currentStep + 1 }, () => {
      if (this.state.currentStep === 3) {
        this.setState({ currentStep: 1 }, () => {
          this.closeModal()
        })
      }
    })
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false }, () => {
      this.props.afterCloseModal()
    });
  }

  getDescriptionForUpload = () => {
    if (this.state.currentStep === 1) {
      return (
        <div>
          <p>Drag and drop a image file</p>
          <p>or</p>
          <p>Click for File Browser</p>
          <em>Demo accepts images in jpg/png format</em>
        </div>
      )
    } else {
      return (
        <div>
          <p>Drag and drop a video file</p>
          <p>or</p>
          <p>Click for File Browser</p>
          <em>Demo accepts videos in mp4 format under 35Mb</em>
        </div>
      )
    }
  }

  getStepHeading = (type, title) => {
    if (type === 'active') {
      return (
        <Step active>
          <Step.Content>
            <Step.Title>{title}</Step.Title>
          </Step.Content>
        </Step>
      )
    } else if (type === 'completed') {
      return (
        <Step completed>
          <Step.Content>
            <Step.Title>{title}</Step.Title>
          </Step.Content>
        </Step>
      )
    } else {
      return (
        <Step>
          <Step.Content>
            <Step.Title>{title}</Step.Title>
          </Step.Content>
        </Step>
      )
    }

  }

  render() {
    const { currentStep } = this.state;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        //className="modalCss"
      >
        <Dropzone
          accept="video/mp4"
          maxFiles={1}
          multiple={false}
          onDrop={this.onDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <Divider horizontal>
                <Header as='h2'>Upload video</Header>
              </Divider>
              <Step.Group ordered>
                {this.getStepHeading(currentStep === 1 ? 'active' : 'completed', 'Upload thumbnail')}
                {this.getStepHeading(currentStep > 1 ? 'active' : '', 'Upload video')}
              </Step.Group>
              <div {...getRootProps({ className: "dropzone" })}>
                <Segment placeholder className="dropZoneClass">
                  <Header icon>
                    <Icon name={currentStep === 2 ? "video file outline" : "file image outline"} color="grey" />
                    <input {...getInputProps()} />
                    {this.getDescriptionForUpload()}
                  </Header>
                </Segment>
              </div>
              <Button primary type="submit" className="nextbutton" style={{ marginTop: 10 }} value="NEXT" onClick={this.onNext}>NEXT</Button>
            </section>
          )}
        </Dropzone>
      </Modal>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadModal);
