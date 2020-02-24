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
    const { activeIndex } = this.state;
    const { videos, videosToUpload } = this.props;

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
              activeIndex={activeIndex}
              className='keyframe-tabs'
              menu={{ secondary: true, pointing: true }}
              panes={[
                { menuItem: `Analyzed (${videos.items.length})` },
                { menuItem: `Pending (${videosToUpload.items.length})` }
              ]}
              onTabChange={(e, { activeIndex }) => {
                this.setState({activeIndex})
              }}
          />
          </Grid.Row>
          <Grid.Row className='mini-vertical-scroll scroll-panes'>
            <Item.Group divided className='divided-items-ellipsis'>
              { (!activeIndex)
                ?  videos.items.length
                  ? videos.items.map((video, id) => <VideoListItem video={video} key={id} />)
                  : <Item>No analyzed videos</Item>
                : videosToUpload.items.length
                  ? videosToUpload.items.map((video, id) => <VideoListItemloading video={video} key={id} />)
                  : <Item>No pending videos</Item>
              }
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
