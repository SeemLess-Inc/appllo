import React, { useState } from "react";
import { connect } from "react-redux";
import { List, Button, Grid, Header, Icon } from "semantic-ui-react";
import FramerScrubber from "./FramerScrubber";
import SaveClipModal from "./SaveClipModal";

const Framer = ({clip, currentClip}) => {
  const [isSaveClipModalOpen, setIsSaveClipModalOpen] = useState(false);
  const clipDurationText = clip.duration
    ? `${clip.duration.toFixed(2)} sec`
    : <Icon name='minus' />;

  const clipStartEndText = clip.duration
    ? `${clip.start ? clip.start.toFixed(2) : 0} - ${clip.end.toFixed(2)}`
    : <Icon name='minus' />;

  const handleClickSaveClip = () => {
    setIsSaveClipModalOpen(true);
  };

  return (
    <Grid>
      <SaveClipModal open={isSaveClipModalOpen} onClose={() => {setIsSaveClipModalOpen(false)}} />
      <Grid.Row>
        <Grid.Column width={8}>
          <Header fitted sub header as="h3">
            Framer
          </Header>
          <List horizontal floated='left'>
            <List.Item>Clip&nbsp;&nbsp;{currentClip.name || <Icon name='minus' />}</List.Item>
            <List.Item>{clipDurationText}</List.Item>
            <List.Item header>{clipStartEndText}</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button
            floated='right'
            verticalAlign='top'
            basic
            compact
            color='blue'
            disabled={!clip.duration}
            onClick={() => {handleClickSaveClip()}}>Save Clip</Button>
          <Button floated='right' verticalAlign='top' basic compact color='grey'>Create Thumbnail</Button>
        </Grid.Column>

      </Grid.Row>
      <Grid.Row style={{padding: '0'}}>
        <Grid.Column>
          <FramerScrubber/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

const mapStateToProps = state => ({
  clip: state.currentVideo.clip,
  currentClip: state.clips.currentClip,
  currentKeyframeId: state.keyframes.currentKeyframe[0]
});

export default connect(mapStateToProps)(Framer);
