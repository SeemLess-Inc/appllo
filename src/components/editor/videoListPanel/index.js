import React from "react";
import { connect } from "react-redux";
import { Header, Grid, Item, Divider, Loader } from "semantic-ui-react";
import UploadVideoPanel from "./UploadVideoPanel";
import VideoListItem from "./VideoListItem";
import VideoListItemloading from "./VideoListItemLoading";

class VideosListPanel extends React.Component {
  render() {
    const { videos, videosToUpload } = this.props;

    // Show/Hide vdeo uploader
    var videoIsUploading;
    if (videosToUpload.loading === true) {
      videoIsUploading = (
        <Item.Group divided>
          <VideoListItemloading />
        </Item.Group>
      );
    } else {
      videoIsUploading = <p></p>;
    }

    if (videos.error !== null) {
      return <div>Error! {videos.error.message}</div>;
    } else if (videos.loading === true && videos.items.length === 0) {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="medium">Loading Videos</Header>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column width={16}>
              <Loader active>Loading</Loader>;
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header size="medium">Videos ({videos.items.length})</Header>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <UploadVideoPanel></UploadVideoPanel>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row style={{ margin: 14, overflow: "auto", maxHeight: 550 }}>
            {videoIsUploading}
            <Divider></Divider>
            <Item.Group divided>
              {videos.items.map((video, id) => {
                return <VideoListItem video={video} key={id} />;
              })}
            </Item.Group>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => ({
  videos: state.videos,
  videosToUpload: state.videosToUpload
});
export default connect(mapStateToProps)(VideosListPanel);
