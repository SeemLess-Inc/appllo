import React from "react";
import { connect } from "react-redux";
import { getVideos } from "../../../store/actions/videosActions";
import { Header, Grid, Item, Divider, Dimmer, Loader } from "semantic-ui-react";
import UploadVideoPanel from "./UploadVideoPanel";
import VideoListItem from "./VideoListItem";

class VideosListPanel extends React.Component {
  componentDidMount() {
    this.props.dispatch(getVideos());
  }

  render() {
    const { error, loading, videos } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <Dimmer active inverted>
          <Loader>Loading</Loader>
        </Dimmer>
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
            {videos.map(video => {
              return <VideoListItem video={video} key={video.id} />;
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
export default connect(
  mapStateToProps
)(VideosListPanel);
