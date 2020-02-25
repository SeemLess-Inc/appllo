import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Item, Header, Button } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import { selectClip } from "../../../store/actions/clipsActions";
import { selectKeyframe } from "../../../store/actions/keyframesActions";
import VideoClipKeyframe from "./VideoClipKeyframe";
import "./VideoClipKeyframe.css"

const VideoClipItem = ({ currentClip, clip, dispatch }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const updateThumbnailUrl = files => {
    var src = '';
    if (files && files[0]) {
      var reader = new FileReader();
      setThumbnailUrl(' ')
      var thumbnail = document.getElementById('thumbnail');
      reader.onload = function (e) {
          src = e.target.result;
          setThumbnailUrl(src)
          thumbnail.setAttribute('src',e.target.result);
      }

      reader.readAsDataURL(files[0]);
  }
  };

  return (
    <Dropzone
      accept={"image/jpg, image/jpeg, image/png"}
      maxFiles={1}
      multiple={false}
      onDrop={updateThumbnailUrl}
    >
      {({ getRootProps, getInputProps }) => (

        <Item className={currentClip.id === clip.id && "active"} {...getRootProps({ className: currentClip.id === clip.id && "active" })} style={{ paddingLeft: "1em" }}>
          <input {...getInputProps()} />
          {
            thumbnailUrl !== '' ?
              <img className="thumbnail" src={thumbnailUrl} id="thumbnail" style={{height:50,width:100}} />
              :
              <Button className="thumbnailEditIcon" icon='edit outline' size='big' color='#e9eff1' />
          }
          {/* <Item.Image src={'./video.png'} size='tiny' style={{paddingLeft: "1em"}}/> */}
          <Item.Content onClick={() => {
            dispatch(selectKeyframe(clip.metadata.keyframe));
            dispatch(selectClip(clip));
          }}>
            <Header size='tiny' as="a">{clip.identiryName}</Header>
            <Item.Meta>Duration: {clip.duration.toFixed(2)} sec</Item.Meta>
            <Item.Meta>{clip.startOffset.toFixed(2)} - {(clip.startOffset + clip.duration).toFixed(2)}</Item.Meta>
            <VideoClipKeyframe keyframe={clip.metadata.keyframe} />
          </Item.Content>
        </Item>
      )}
    </Dropzone>

  )
};

const mapStateToProps = state => ({
  currentClip: state.clips.currentClip
});

export default connect(mapStateToProps)(VideoClipItem);
