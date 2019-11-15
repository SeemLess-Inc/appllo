import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import { Player } from "video-react";
import "../../../../node_modules/video-react/dist/video-react.css"
class VideoApp extends Component {
  render() {
    const { currentVideo } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Container>
              <Player
                playsInline
                poster="/assets/poster.png"
                src={currentVideo.src}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo
});

export default connect(mapStateToProps)(VideoApp);
