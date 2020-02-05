import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Icon, Header, Segment, Button } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Modal from 'react-modal';
import UploadModal from '../../UploadModal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    borderColor: '1px'
  }
};

class UploadVideoDropzone extends React.Component {
  constructor() {
    super();

    /* this.onDrop = files => {
      this.closeModal()
      this.setState({ files });
      this.props.uploadVideos(files);
    }; */

    this.state = {
      //files: [],
      //modalIsOpen: false,
      openModalComponent:false
    };
    this.openModal = this.openModal.bind(this);
    //this.closeModal = this.closeModal.bind(this);
  }

  /* onNext = () => {
    this.setState({ currentStep: this.state.currentStep + 1 }, () => {
      if (this.state.currentStep === 3) {
        this.setState({ currentStep: 1 }, () => {
          this.closeModal()
        })
      }
    })
  }
 */
  openModal() {
    //this.setState({ modalIsOpen: true });
    this.setState({ openModalComponent: true },()=>{
      //alert(this.state.openModalComponent)
    });
  }

  /* closeModal() {
    this.setState({ modalIsOpen: false });
  } */

  afterCloseModal = () => {
    this.setState({ openModalComponent: false })
  }

  /* getDescriptionForUpload = () => {
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
  } */

  render() {
    return (
      <div onClick={this.openModal}>

        <section className="container">
          <div>
            <Segment placeholder style={{ marginBottom: '20px', height: '380px' }}>
              {/* <input {...getInputProps()} /> */}
              <Header icon>
                <Icon name="video file outline" color="grey" />
              </Header>
            </Segment>
          </div>
          {/* <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <Dropzone
              accept="video/mp4"
              maxFiles={1}
              multiple={false}
              onDrop={this.onDrop}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="container">
                  <h2>Upload video</h2><hr />
                  <div stle={{ display: 'inline-block', backgroundColor: 'red' }}>
                    <h3 style={{ color: '#fff', backgroundColor: currentStep >= 0 ? '#4285f4' : 'gray', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', paddingTop: 10, borderRadius: 20, display: 'inline-block' }} Align="center">1</h3>
                    <h3 style={{ display: 'inline-block', marginLeft: 10 }}>Upload thumbnail</h3>
                    <h3 style={{ color: '#fff', backgroundColor: currentStep >= 2 ? '#4285f4' : 'gray', marginLeft: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', paddingTop: 10, borderRadius: 20, display: 'inline-block' }} Align="center">2</h3>
                    <h3 style={{ display: 'inline-block', marginLeft: 10 }}>Upload video</h3>
                  </div>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <Segment placeholder style={{ marginBottom: '20px', height: '320px', backgroundColor: '#fff' }}>

                      <Header icon>
                        <Icon name={currentStep === 2 ? "video file outline" : "file image outline"} color="grey" />
                        <input {...getInputProps()} />
                        {this.getDescriptionForUpload()}
                      </Header>
                    </Segment>
                  </div>

                  <div style={{}}>
                    <Button type="submit" style={{ backgroundColor: '#4285f4', padding: 13, width: 100, color: '#fff', float: 'right' }} value="NEXT" onClick={this.onNext}>NEXT</Button>
                  </div>
                </section>
              )}
            </Dropzone>
          </Modal> */}
          {this.state.openModalComponent&&<UploadModal afterCloseModal={this.afterCloseModal}/>}
        </section>

        
      </div>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoDropzone);
