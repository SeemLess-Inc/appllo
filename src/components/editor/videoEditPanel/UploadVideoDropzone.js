import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Icon, Header, Segment } from "semantic-ui-react";
import UploadModal from '../../UploadModal';

class UploadVideoDropzone extends React.Component {
  constructor() {
    super();
    this.state = {
      openModalComponent: false
    };
    this.openModal = this.openModal.bind(this);
  }
  
  openModal() {
    this.setState({ openModalComponent: true });
  }

  afterCloseModal = () => {
    this.setState({ openModalComponent: false })
  }

  render() {
    return (
      <div onClick={this.openModal}>

        <section className="container">
          <div>
            <Segment placeholder style={{ marginBottom: '20px', height: '380px' }}>
              <Header icon>
                <Icon name="video file outline" color="grey" />
              </Header>
            </Segment>
          </div>
          {
            this.state.openModalComponent &&
            <UploadModal afterCloseModal={this.afterCloseModal} />
          }
        </section>


      </div>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoDropzone);
