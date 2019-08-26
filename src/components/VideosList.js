import React from "react";
import { Header, Icon, Grid, Item, Divider } from "semantic-ui-react";
import VideoListItem from "./VideoListItem";

class VideosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const videos = [
      {
        id: 0,
        title: "Big Little Lies - Apple iMac",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "55:12"
      },
      {
        id: 1,
        title: "13 Reasons Why - VW",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "53:25"
      },
      {
        id: 2,
        title: "Comedians in Cars - BMW",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "43:17"
      },
      {
        id: 3,
        title: "Stranger Things - Coke",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "56:32"
      },
      {
        id: 4,
        title: "Black Mirror - PGTips",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "56:36"
      },
      {
        id: 5,
        title: "Comedians in Cars - BMW",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "47:18"
      },
      {
        id: 6,
        title: "True Detective - Bud Light",
        thumbnail: './video.png',
        uploadedDate: "May 6, 2019",
        duration: "56:34"
      }
    ];

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

export default VideosList;
