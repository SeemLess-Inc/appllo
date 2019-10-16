import React from "react";
import { connect } from "react-redux";
import { Header, Grid, Divider, Button } from "semantic-ui-react";

class VideoEditorHeader extends React.Component {
  state = {};
  handleClick() {
    console.log("TODO: Save Keyframe data");
  }

  render() {
    // Create an object to render
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
    let saveButton;
    if (o.id === "" || this.props.error === true) {
      o.title = "Choose a video from the list";
      o.uploadedDate = "";
      saveButton = <Button disabled>Save</Button>;
    } else if (this.props.loading === true) {
      o.title = "Loading Keyframes";
      o.uploadedDate = "";
      saveButton = <Button disabled>Save</Button>;
    } else {
      saveButton = <Button onClick={this.handleClick}>Save</Button>;
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header size="medium">
              {o.title}
              <Header.Subheader>{o.uploadedDate}</Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            {saveButton}
          </Grid.Column>
        </Grid.Row>
        <Divider />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items,
  loading: state.keyframes.loading,
  error: state.keyframes.error
});
export default connect(mapStateToProps)(VideoEditorHeader);
