import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { selectKeyframe } from "../../../store/actions/keyframesActions";
import './VideoKeyframeTag.css'

const VideoKeyframeTag = ({keyframe, player, currentKeyframeId, dispatch}) => {
  const selectNewKeyframe = () => dispatch(selectKeyframe(keyframe));
  const getTagPosition = (seconds, tagWidth=16)  => {
    if (player) {
      const duration = player.video.props.player.duration;
      const middleOfTag = tagWidth / 2;
      return `calc(${(seconds / duration)*100}% - ${middleOfTag}px)`
    } else {
      return -10000
    }
  };
  const active = (value, fallbackValue) => keyframe[0] === currentKeyframeId ? value : fallbackValue;
  const videoTagButtonStyle = () => keyframe[0] === currentKeyframeId
      ? {left: getTagPosition(keyframe[1].frame_time, 20), width:20, zIndex:2}
      : {left: getTagPosition(keyframe[1].frame_time, 14), width:14};

  return (
    <Button
      className='video-tag-button'
      style={videoTagButtonStyle()}
      onClick={selectNewKeyframe}
      title={"Keyframe: " + keyframe[1].frame_time}
    ><Icon
      name='tag'
      className={active('video-tag active', 'video-tag')}
      size={active('big', 'large')}
       /></Button>
  )
};


const mapStateToProps = state => ({
  currentKeyframeId: state.keyframes.currentKeyframe[0]
});

export default connect(mapStateToProps)(VideoKeyframeTag);

// color={active('teal', 'grey')}