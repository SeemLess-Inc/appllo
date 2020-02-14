import React from "react";
import { connect } from "react-redux";
import { Menu, Grid, Header, Icon } from "semantic-ui-react";
import FramerScrubber from "./FramerScrubber";

const Framer = ({clip, currentKeyframeId}) => {
  const keyframeText = currentKeyframeId
    ? `Keyframe ${currentKeyframeId}`
    : <Icon name='minus' />;

  const clipDurationText = clip.duration
    ? `${clip.duration.toFixed(2)} sec`
    : <Icon name='minus' />;

  const clipStartEndText = clip.duration
    ? `${clip.start ? clip.start.toFixed(2) : 0} - ${clip.end.toFixed(2)}`
    : <Icon name='minus' />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Menu secondary>
            <Header fitted sub header as="h3">
              Framer
            </Header>
            <Menu.Menu position="right">
              <Menu.Item>{keyframeText}</Menu.Item>
              <Menu.Item>{clipDurationText}</Menu.Item>
              <Menu.Item header>{clipStartEndText}</Menu.Item>
            </Menu.Menu>
          </Menu>
          <FramerScrubber/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

const mapStateToProps = state => ({
  currentKeyframeId: state.keyframes.currentKeyframe[0],
  clip: state.currentVideo.clip
});

export default connect(mapStateToProps)(Framer);
