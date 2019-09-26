import React from "react";
import { connect } from "react-redux";
import { Header, Grid, Item, Divider } from "semantic-ui-react";
import UploadVideoPanel from "./UploadVideoPanel";
import VideoListItem from "./VideoListItem";

class VideosListPanel extends React.Component {
  render() {
    const { error, loading, videos } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="medium">Loading Videos</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header size="medium">Videos ({videos.length})</Header>
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            <UploadVideoPanel></UploadVideoPanel>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row style={{ margin: 14 }}>
          <Item.Group divided>
            {videos.map( (video, id) => {
              return <VideoListItem video={video} key={id} />;
            })}
          </Item.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos.items,
  loading: state.videos.loading,
  error: state.videos.error
});
export default connect(mapStateToProps)(VideosListPanel);
