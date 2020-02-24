import React from "react";
import { connect } from "react-redux";
import { Header, Grid, Item, Divider, Loader, Tab } from "semantic-ui-react";
import UploadVideoPanel from "./UploadVideoPanel";
import VideoListItem from "./VideoListItem";
import VideoListItemloading from "./VideoListItemLoading";
import "../styles.css"

class VideosListPanel extends React.Component {
  state = { activeIndex: 0 }

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
      videoIsUploading = <div />;
    }

    if (videos.error !== null) {
      return <div>Error! {videos.error.message}</div>;
    } else if (videos.loading === true && videos.items.length === 0) {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header sub color='grey'>Source Video</Header>
            </Grid.Column>
            <Tab
              className='keyframe-tabs'
              menu={{ secondary: true, pointing: true }}
              panes={[{ menuItem: 'Analyzed' }, { menuItem: 'Pending' }]}
          />
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column width={16}>
              <p/>
              <Loader active verticalAlign='middle'>Loading</Loader>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid stackable columns={2} verticalAlign='top'>
          <Grid.Row className='top-action-container' style={{paddingBottom: '0'}}>
            <Grid.Column>
              <Header sub color='grey'>Source Video</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <UploadVideoPanel />
            </Grid.Column>
            <Tab
              className='keyframe-tabs'
              menu={{ secondary: true, pointing: true }}
              panes={[
                { menuItem: `Analyzed (${videos.items.length})` },
                { menuItem: `Pending (${videosToUpload.items.length})` }
              ]}
          />
          </Grid.Row>
          <Grid.Row className='mini-vertical-scroll scroll-panes'>
            {videoIsUploading}
            <Divider />
            <Item.Group divided className='divided-items-ellipsis'>
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
