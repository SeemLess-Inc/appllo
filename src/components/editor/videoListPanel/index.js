import React from "react";
import { connect } from "react-redux";
import { fetchVideos } from "../../../store/actions/videosActions";

import { Header, Icon, Grid, Item, Divider } from "semantic-ui-react";
import VideoListItem from "./VideoListItem";

class VideosListPanel extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchVideos());
  }

  render() {
    const { error, loading, videos } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
            <Header size="medium">Videos (8)</Header>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <Icon name="upload" />
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

//export default VideosListPanel;

const mapStateToProps = state => ({
  videos: state.videos.items,
  loading: state.videos.loading,
  error: state.videos.error
});

export default connect(mapStateToProps)(VideosListPanel);
