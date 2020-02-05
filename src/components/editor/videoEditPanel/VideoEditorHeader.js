import React from "react";
import { connect } from "react-redux";
import {Header, Grid, Button, Message} from "semantic-ui-react";
import { saveKeyframes, saveKeyframesMarkDirty } from "../../../store/actions/saveKeyframesActions";
import './VideoEditorHeader.css'

class VideoEditorHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = () => {
      this.props.saveKeyframes( this.props.keyframes, this.props.currentVideo.id + ".json" );
    };
  }

  render() {
    // Create an object to render
    const { dirty, saveKeyframesMarkDirty, loading, submitting, success } = this.props;
    const o = {};
    o.id = this.props.currentVideo.id;
    o.title = this.props.currentVideo.id;
    o.uploadedDate = this.props.currentVideo.hasOwnProperty("uploadedDate")
      ? this.props.currentVideo.uploadedDate
      : "Unknown date";
    /*
  o.thumbnail = props.currentVideo.hasOwnProperty("thumbnail")
    ? props.currentVideo.thumbnail
    : "./video.png";
  o.state = "Uploaded";
  */

    // Show/Hide video and disable Save button
    let saveButton = <div/>;
    if (o.id === "" || this.props.error === true) {
      saveKeyframesMarkDirty(false);
      o.title = "No video selected";
      o.uploadedDate = "–";
    } else if (loading) {
      saveKeyframesMarkDirty(false);
      o.title = "Loading Keyframes";
      o.uploadedDate = "–";
    } else {
      saveButton = <Button color='blue' disabled={!dirty || submitting} loading={submitting} onClick={this.handleClick}>Save</Button>;
    }
    const successMessageClassName = success
      ? <Message size='mini' floating success className='fading-container'>Keyframe metadata successfully saved!</Message>
      : <div />;

    return (
      <Grid stackable columns={2} verticalAlign='top'>
        {successMessageClassName}
        <Grid.Row className='top-action-container'>
          <Grid.Column width={12}>
            <Header sub color='grey'>Video Editor
            <Header size="medium" style={{marginTop: '10px'}}>
              {o.title}
              <Header.Subheader>{o.uploadedDate}</Header.Subheader>
              </Header>
            </Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            {saveButton}
          </Grid.Column>
        </Grid.Row>
        {/* <Divider /> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items,
  loading: state.keyframes.loading,
  dirty: state.saveKeyframes.dirty,
  submitting: state.saveKeyframes.loading,
  success: state.saveKeyframes.success,
  error: state.keyframes.error
});
export default connect(
  mapStateToProps,
  { saveKeyframes, saveKeyframesMarkDirty } // mapDispatchToProps
)(VideoEditorHeader);
