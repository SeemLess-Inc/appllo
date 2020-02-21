import React from "react";
import { connect } from "react-redux";
import { Item, Header } from "semantic-ui-react";
import { selectClip } from "../../../store/actions/clipsActions";

const VideoClipItem = ({ currentClip, clip, dispatch }) => (
  <Item className={currentClip.id === clip.id && "active"}>
    <Item.Image src={'./video.png'} size='tiny' style={{paddingLeft: "1em"}}/>
    <Item.Content style={{paddingLeft: "1em"}} onClick={() => {
      dispatch(selectClip(clip))
    }}>
      <Header size='tiny' as="a">{clip.name}</Header>
      <Item.Meta>Duration: {clip.duration.toFixed(2)} sec</Item.Meta>
      <Item.Meta>{clip.start.toFixed(2)} - {clip.end.toFixed(2)}</Item.Meta>
    </Item.Content>
  </Item>
);

const mapStateToProps = state => ({
  currentClip: state.clips.currentClip
});

export default connect(mapStateToProps)(VideoClipItem);
