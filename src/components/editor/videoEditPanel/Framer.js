import React from "react";
import { connect } from "react-redux";
import { List, Button, Grid, Header, Icon } from "semantic-ui-react";
import FramerScrubber from "./FramerScrubber";

const Framer = ({clip, currentKeyframeId,playerWidth}) => {
  const clipDurationText = clip.duration
    ? `${clip.duration.toFixed(2)}sec`
    : <Icon name='minus' />;

  const clipStartEndText = clip.duration
    ? `${clip.start ? clip.start.toFixed(2) : 0} - ${clip.end.toFixed(2)}`
    : <Icon name='minus' />;
  var playerWidth = playerWidth ? playerWidth : '100%'
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header fitted sub header as="h3">
            Framer
          </Header>
          <List horizontal floated='left'>
            <List.Item>Keyframe&nbsp;&nbsp;{currentKeyframeId || <Icon name='minus' />}</List.Item>
            <List.Item>{clipDurationText}</List.Item>
            <List.Item header>{clipStartEndText}</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button floated='right' verticalAlign='top' basic compact color='blue'>Save Clip</Button>
          <Button floated='right' verticalAlign='top' basic compact color='grey'>Create Thumbnail</Button>
        </Grid.Column>

      </Grid.Row>
      <Grid.Row style={{padding: '0'}}>
        <Grid.Column>
          <FramerScrubber playerWidth={playerWidth}/>
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
