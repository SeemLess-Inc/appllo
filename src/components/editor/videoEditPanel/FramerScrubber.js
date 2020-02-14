import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Icon, Segment} from "semantic-ui-react";
import Draggable from 'react-draggable'; // Both at the same time
import './Framer.css'
import { setClip } from "../../../store/actions/currentVideoAction";

const FramerScrubber = ({player, clip, dispatch}) => {
  const [rightClip, setRightClip] = useState(0);
  const [leftClip, setLeftClip] = useState(0);
  const framerScrubber = React.createRef();
  const clipped = React.createRef();
  const leftHandleDrag = (e, {x}) => {
    setLeftClip(x);
  };
  const rightHandleDrag = (e, {x}) => {
    setRightClip(x);
  };
  const handleStop = () => {
    const frameScrubberWidth = framerScrubber.current.offsetWidth;
    const clippedWidth = clipped.current.offsetWidth;
    const clippedLeft = clipped.current.offsetLeft;
    const clippedRight = clippedWidth + clippedLeft;
    const videoDuration = player.video.props.player.duration;

    dispatch(setClip({
      start: clippedLeft ? (frameScrubberWidth / clippedLeft) * videoDuration : 0,
      end: (frameScrubberWidth / clippedRight) * videoDuration,
      duration: (frameScrubberWidth / clippedWidth) * videoDuration,
      videoDuration
    }));

  };

  useEffect(() => {
    console.debug(clip);
  }, [clip]);

  const draggableClipBracketAttr = {
    axis: 'x',
    handle: '.handle',
    defaultPosition: {x: 0, y: 0},
    position:null,
    bounds:'parent',
    grid:[1, 1],
    scale:1,
    onStop:handleStop
  };

  return !player ? <Segment style={{height: '80px'}} /> : (
    <div className='framer-scrubber' ref={framerScrubber}>
      <div className='scrubber-area' />
      <div className='clipped' ref={clipped} style={{left: leftClip, width: `calc(100% + ${rightClip}px - ${leftClip}px)`}}/>
      <Draggable { ...draggableClipBracketAttr } onDrag={leftHandleDrag}>
        <div className='clip-bracket left'>
          <div className='handle'><Icon name='chevron left'/></div>
        </div>
      </Draggable>
      <Draggable { ...draggableClipBracketAttr } onDrag={rightHandleDrag}>
        <div className='clip-bracket right'>
          <div className='handle'><Icon name='chevron right'/></div>
        </div>
      </Draggable>
    </div>
  )
};

const mapStateToProps = state => ({
  player: state.currentVideo.player,
  clip: state.currentVideo.clip
});

export default connect(mapStateToProps)(FramerScrubber);
