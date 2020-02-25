import React from "react";
import { connect } from "react-redux";
import { uploadVideos } from "../../../store/actions/uploadVideoActions";
import { Button, Icon } from "semantic-ui-react";
import UploadModal from '../../UploadModal';

class UploadVideoPanel extends React.Component {
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
      <div>
        <Button icon='upload' size='tiny' color='blue' basic circular compact onClick={this.openModal} />
        {
          this.state.openModalComponent &&
          <UploadModal afterCloseModal={this.afterCloseModal} />
        }
      </div>
    );
  }
}

export default connect(
  state => ({ videosToUpload: state.videosToUpload }), // mapStateToProps
  { uploadVideos } // mapDispatchToProps
)(UploadVideoPanel);
