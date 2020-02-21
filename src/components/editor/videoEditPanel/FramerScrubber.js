import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Segment, Loader } from "semantic-ui-react";
import Draggable from 'react-draggable'; // Both at the same time
import './FramerScrubber.css';
import { setClip } from "../../../store/actions/currentVideoAction";

const FramerScrubber = ({ player, clip, dispatch, playerWidth, array, selectKeyFrame, extracting }) => {
  const [selectedKeyFrame, setSelectedKeyFrame] = useState(0);
  const [rightClip, setRightClip] = useState(0);
  const [leftClip, setLeftClip] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const framerScrubber = React.createRef();
  const clipped = React.createRef();
  const playerVideoPropsSrc = (!!player && player.video.props.src);
  const leftHandleDrag = (e, { x }) => {
    setLeftClip(x);
  };
  const rightHandleDrag = (e, { x }) => {
    setRightClip(x);
  };
  const setStartEnd = () => {
    const frameScrubberWidth = framerScrubber.current.offsetWidth;
    const clippedWidth = clipped.current.offsetWidth;
    const clippedLeft = clipped.current.offsetLeft;
    const clippedRight = clippedWidth + clippedLeft;
    const videoDuration = player.video.props.player.duration;
    setStart(clippedLeft ? (clippedLeft / frameScrubberWidth) * videoDuration : 0);
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
      start,
      end,
      duration: (clippedWidth / frameScrubberWidth) * videoDuration,
      videoDuration
    }));

  };

  /* useEffect(()=>{
    console.debug(selectedKeyFrame);
  }) */

  useEffect(() => {
    if (framerScrubber.current && clipped.current) {
      setStartEnd()
    }
  }, [leftClip, rightClip]);

  useEffect(() => {
    console.debug(clip);
  }, [clip]);

  useEffect(() => {
    setLeftClip(0);
    setRightClip(0);
    setStart(0);
    setEnd(0);
  }, [playerVideoPropsSrc]);

  const setKeyFrame = (index) => {
    setSelectedKeyFrame(index)
    selectKeyFrame(index)
  }

  const draggableClipBracketAttr = {
    axis: 'x',
    handle: '.handle',
    bounds: 'parent',
    grid: [1, 1],
    scale: 1,
    onStart: handleStart,
    onStop: handleStop
  };

  return !player ? <Segment style={{ height: '80px' }} /> : (
    <div>
      <div id="selectedKeyFrame" style={{marginLeft: ((selectedKeyFrame + 1) * (Math.floor(playerWidth / array.length)) - (playerWidth / array.length) - 75)}}>

      </div>
      <div className='framer-scrubber' ref={framerScrubber}>
        <div className='scrubber-area' id="videoFrames" style={{ width: `${playerWidth}` }}>
          {
            array.length !== 0 &&
            array.map((item, index) => {
              return (
                <div
                  className="keyFrame"
                  onClick={() => setKeyFrame(index)}
                  style={{left: ((index + 1) * (Math.floor(playerWidth / array.length)) - (playerWidth / array.length) - 5) }}
                >
                  <Icon
                    name='tag'
                    className={selectedKeyFrame === index ? 'video-tag-active' : 'video-tag'}
                    size='small'
                  />
                  <div className="keyFrame-verticalLine" style={{backgroundColor: selectedKeyFrame === index ? 'teal' : 'grey'}}></div>
                </div>
              )
            })
          }
        </div>
        <div className='clipped' ref={clipped} style={{ left: leftClip, width: `calc(100% + ${rightClip}px - ${leftClip}px)` }} >
          {extracting &&
            <div className="loader">
              <Loader active inline />
            </div>
          }
        </div>
        <Draggable
          {...draggableClipBracketAttr}
          onDrag={leftHandleDrag}
          position={{ x: leftClip, y: 0 }}
        >
          <div className='clip-bracket left'>
            <div className='clip-info'>{start.toFixed(2)} sec</div>
            <div className='handle'><Icon name='chevron right' /></div>
          </div>
        </Draggable>
        <Draggable
          {...draggableClipBracketAttr}
          onDrag={rightHandleDrag}
          position={{ x: rightClip, y: 0 }}
        >
          <div className='clip-bracket right'>
            <div className='clip-info'>{end.toFixed(2)} sec</div>
            <div className='handle'><Icon name='chevron left' /></div>
          </div>
        </Draggable>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  player: state.currentVideo.player,
  clip: state.currentVideo.clip
});

export default connect(mapStateToProps)(FramerScrubber);
