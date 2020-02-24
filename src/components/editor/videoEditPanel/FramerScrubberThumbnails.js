import React from "react";
import { connect } from "react-redux";
import './FramerScrubber.css'
import './FrameScrubberThumbnails.css'
import { Image } from "semantic-ui-react";
const FrameScrubberThumbnails = ({currentKeyframe, player, keyframes}) => {
  const keyframeThumbnailPosition = keyframeSeconds => {
    const videoDuration = player.video.props.player.duration;
    return `${(keyframeSeconds / videoDuration) * 100}%`
  };

  return !player ? null : (
    <div className='frame-scrubber-thumbnails-area'>
      { keyframes.map(keyframe => (
        <Image
          className='frame-scrubber-thumbnail'
          src={keyframe[1].image_url}
          style={{left: keyframeThumbnailPosition(keyframe[1].frame_time)}}
        />
      ))}
      { currentKeyframe && (
        <Image
          className='frame-scrubber-thumbnail active'
          src={currentKeyframe[1].image_url}
          style={{left: keyframeThumbnailPosition(currentKeyframe[1].frame_time)}}
        />
      )}
    </div>
  )
};

const mapStateToProps = state => ({
  currentKeyframe: state.keyframes.currentKeyframe,
  keyframes: state.keyframes.items,
  player: state.currentVideo.player
});

export default connect(mapStateToProps)(FrameScrubberThumbnails);
