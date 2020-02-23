import React from "react";
import { connect } from "react-redux";
import { Item, Header } from "semantic-ui-react";
import { selectClip } from "../../../store/actions/clipsActions";
import VideoClipKeyframe from "./VideoClipKeyframe";
import "./VideoClipKeyframe.css"

const VideoClipItem = ({ currentClip, clip, dispatch }) => (
  <Item className={currentClip.id === clip.id && "active"}>
    <Item.Image src={'./video.png'} size='tiny' style={{paddingLeft: "1em"}}/>
    <Item.Content style={{paddingLeft: "1em"}} onClick={() => {
      dispatch(selectClip(clip))
    }}>
      <Header size='tiny' as="a">{clip.identiryName}</Header>
      <Item.Meta>Duration: {clip.duration.toFixed(2)} sec</Item.Meta>
      <Item.Meta>{clip.startOffset.toFixed(2)} - {(clip.startOffset + clip.duration).toFixed(2)}</Item.Meta>
      <VideoClipKeyframe keyframe={clip.metadata.keyframe} />
    </Item.Content>
  </Item>
);

const mapStateToProps = state => ({
  currentClip: state.clips.currentClip
});

export default connect(mapStateToProps)(VideoClipItem);
