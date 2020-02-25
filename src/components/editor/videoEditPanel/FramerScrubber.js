import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Icon, Segment, Loader } from "semantic-ui-react";
import Draggable from 'react-draggable'; // Both at the same time
import './FramerScrubber.css';
import { setClip } from "../../../store/actions/currentVideoAction";
import FramerScrubberThumbnails from "./FramerScrubberThumbnails";

const FramerScrubber = ({player, clip, currentClip, dispatch, playerWidth, array, selectKeyFrame, extracting}) => {
  const [selectedKeyFrame, setSelectedKeyFrame] = useState(0);
  const [scrollLeft, setScrollleft] = useState(0);

  const [keyFrameMarker, setKeyFrameMarker] = useState(0);

  const [rightClip, setRightClip] = useState(0);
  const [leftClip, setLeftClip] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const [end, setEnd] = useState(0);
  const framerScrubber = React.createRef();
  const clipped = React.createRef();
  const playerVideoPropsSrc = (!!player && player.video.props.src);

  const setKeyFramePosition = (e, { x }) => {
    setKeyFrameMarker(x);
  };

  const leftHandleDrag = (e, {x}) => {
    setLeftClip(x);
  };
  const rightHandleDrag = (e, {x}) => {
    setRightClip(x);
  };
  const setStartEnd = () => {
    const frameScrubberWidth = framerScrubber.current.offsetWidth;
    const clippedWidth = clipped.current.offsetWidth;
    const clippedLeft = clipped.current.offsetLeft;
    const clippedRight = clippedWidth + clippedLeft;
    const videoDuration = player.video.props.player.duration;
    setStartOffset(clippedLeft ? (clippedLeft / frameScrubberWidth) * videoDuration : 0);
    setEnd((clippedRight / frameScrubberWidth) * videoDuration);
  };
  const handleStart = () => {
    setStartEnd()
  };
  const handleStop = () => {
    const frameScrubberWidth = framerScrubber.current.offsetWidth;
    const clippedWidth = clipped.current.offsetWidth;
    const videoDuration = player.video.props.player.duration;

    dispatch(setClip({
      startOffset: startOffset,
      duration: (clippedWidth / frameScrubberWidth) * videoDuration
    }));

  };
  const resetClip = () => {
    setLeftClip(0);
    setRightClip(0);
    setStartOffset(0);
    setEnd(0);
  };
  const setClipToCurrentClip = () => {
    if(currentClip.id) {
      const frameScrubberWidth = framerScrubber.current.offsetWidth;
      const videoDuration = player.video.props.player.duration;
      const currentClipEnd = currentClip.startOffset + currentClip.duration;

      setLeftClip((currentClip.startOffset / videoDuration) * frameScrubberWidth);
      setRightClip(((currentClipEnd / videoDuration) * frameScrubberWidth)  - frameScrubberWidth);
      setStartOffset(currentClip.startOffset);
      setEnd(currentClipEnd);

      dispatch(setClip({
        startOffset: currentClip.startOffset,
        duration: currentClip.duration
      }));
    }
  };

  useEffect(() => {
    if (framerScrubber.current && clipped.current) {
      setStartEnd()
    }
  }, [leftClip, rightClip]);

  useEffect(() => { console.debug(clip) }, [clip]);
  useEffect(() => { resetClip() }, [playerVideoPropsSrc]);
  useEffect(() => { setClipToCurrentClip() }, [currentClip.id]);

  const setKeyFrame = (index) => {
    setSelectedKeyFrame(index)
    selectKeyFrame(index)
  }

  const scollPos = () => {
    setScrollleft(document.getElementById("videoFrames").scrollLeft);
    let selectedFrame = (keyFrameMarker + scrollLeft) / 150;
    setKeyFrame(Math.floor(selectedFrame));
    console.log('array length: ' + array.length)
  }

  useEffect(() => {
    console.log('scrollLeft: ' + scrollLeft);
  }, [scrollLeft]);

  useEffect(() => {
    console.log('keyFrameMarker: ' + keyFrameMarker);
  }, [keyFrameMarker]);

  const onStopKeyFrameMarker = () => {
    let selectedFrame = (keyFrameMarker + scrollLeft) / 150;
    setKeyFrame(Math.floor(selectedFrame));
  }

  const draggableClipBracketAttr = {
    axis: 'x',
    handle: '.handle',
    bounds:'parent',
    grid:[1, 1],
    scale:1,
    onStart:handleStart,
    onStop:handleStop
  };

  return !player ? <Segment style={{height: '80px'}} /> : (
    <div>
      <div id="selectedKeyFrame" style={{ position:'absolute',bottom:100, left: keyFrameMarker-60 }}>

      </div>
      <div style={{ marginLeft: keyFrameMarker-3}}>
        <Icon
          name='tag'
          className={'video-tag-active'}
          size='small'
        />
      </div>
    <div className='framer-scrubber' ref={framerScrubber}>
      <div className='scrubber-area' id="videoFrames" style={{ width: `${playerWidth}` }} onScroll={() => scollPos()} />
      {/* <FramerScrubberThumbnails /> */}
      <div className='clipped' ref={clipped} style={{left: leftClip, width: `calc(100% + ${rightClip}px - ${leftClip}px)`}}/>
      
      <div className='clipped' ref={clipped} style={{ left: leftClip, width: `calc(100% + ${rightClip}px - ${leftClip}px)` }} >
          {extracting &&
            <div className="loader">
              <Loader active inline />
            </div>
          }
        </div>
        <Draggable
          axis="x"
          onDrag={setKeyFramePosition}
          position={{ x: keyFrameMarker, y: 0 }}
          onStop={onStopKeyFrameMarker}
        >
          <div className="keyFrameMarker"></div>
        </Draggable>

      <Draggable
        { ...draggableClipBracketAttr }
        onDrag={leftHandleDrag}
        position={{x: leftClip, y: 0}}
      >
        <div className='clip-bracket left'>
          <div className='clip-info'>{startOffset.toFixed(2)} sec</div>
          <div className='handle'><Icon name='chevron right'/></div>
        </div>
      </Draggable>
      <Draggable
        { ...draggableClipBracketAttr }
        onDrag={rightHandleDrag}
        position={{x: rightClip, y: 0}}
      >
        <div className='clip-bracket right'>
          <div className='clip-info'>{end.toFixed(2)} sec</div>
          <div className='handle'><Icon name='chevron left'/></div>
        </div>
      </Draggable>
    </div>
    </div>
  )
};

const mapStateToProps = state => ({
  currentClip: state.clips.currentClip,
  player: state.currentVideo.player,
  clip: state.currentVideo.clip
});

export default connect(mapStateToProps)(FramerScrubber);
