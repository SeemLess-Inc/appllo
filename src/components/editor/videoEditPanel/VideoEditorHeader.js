import React from "react";
import { connect } from "react-redux";
import { Header, Grid, Divider, Button } from "semantic-ui-react";

const VideoEditorHeader = props => {
  // Create an object to render
  const o = {};
  o.id = props.currentVideo.id;
  o.title = props.currentVideo.id;
  o.uploadedDate = props.currentVideo.hasOwnProperty("uploadedDate")
    ? props.currentVideo.uploadedDate
    : "Unknown date";
  /*
  o.thumbnail = props.currentVideo.hasOwnProperty("thumbnail")
    ? props.currentVideo.thumbnail
    : "./video.png";
  o.state = "Uploaded";
  */

  // Show/Hide video and disable Save button
  let saveButton;
  if (o.id === "") {
    o.title = "Choose a video from the list";
    o.uploadedDate = "";
    saveButton = <Button disabled>Save</Button>;
  } else {
    saveButton = <Button>Save</Button>;
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
};

const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});
//const mapDispatchToProps = { selectVideo }

export default connect(
  mapStateToProps
  //  mapDispatchToProps
)(VideoEditorHeader);
