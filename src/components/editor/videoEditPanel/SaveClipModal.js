import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal, Message, Form } from "semantic-ui-react";
import { createClip, updateClip } from "../../../store/actions/clipsActions";

const SaveClipModal = (
  {
    clip,
    clips,
    currentClip,
    dispatch,
    error,
    loading,
    onClose,
    open,
    success
  }
) => {
  const [clipName, setClipName] = useState('');

  const errorMessage = ({status}) => {
    switch(status) {
      case 409:
        return 'Clip already exists. Change the clip name.';
      default:
        return 'There was an error saving the clip. Please try again.';
    }
  };

  useEffect(() => {
    if (currentClip) {
      setClipName(currentClip.identiryName);
    }
  }, [currentClip]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
    <Modal size="tiny" dimmer='inverted' open={open} onClose={onClose} style={{paddingBottom: '16px'}}>
      <Modal.Content>
        <Modal.Description>
          <Header as="h3">Save Video Clip</Header>
          <Form>
            <Form.Field>
              <Form.Input
                label='Clip'
                id='clipName'
                error={!!error}
                placeholder='enter clip name'
                value={clipName}
                onChange={(e, { value }) =>
                  setClipName(value)
                }/>
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Duration</label>
                {!!clip.duration && clip.duration.toFixed(2)} sec
              </Form.Field>
              <Form.Field>
                <label>Start</label>
                {!!clip.startOffset ? clip.startOffset.toFixed(2) : 0} sec
              </Form.Field>
              <Form.Field>
                <label>End</label>
                {!!clip.duration && ((!!clip.startOffset ? clip.startOffset : 0) + clip.duration).toFixed(2)} sec
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {error && (
          <Message warning visible>
            <Message.Header>{errorMessage(error)}</Message.Header>
          </Message>
        )}
        
        <Button
          floated='left'
          color="olive"
          onClick={() => {
            dispatch(createClip({...clip, identiryName: clipName}, clips));
          }}
          loading={loading}
          disabled={loading}>Save New Clip</Button>
          <Button floated='left' onClick={() => onClose()} disabled={loading}>Cancel</Button>
        {currentClip.id &&
        <Button
          floated='left'
          color="olive"
          onClick={() => {
            dispatch(updateClip({ ...currentClip, ...clip, identiryName: clipName }));
          }}
          loading={loading}
          disabled={loading}>Save</Button>
        }
      </Modal.Actions>
    </Modal>
  )
};

const mapStateToProps = state => ({
  clip: state.currentVideo.clip,
  clips: state.clips.items,
  currentClip: state.clips.currentClip,
  currentKeyframe: state.keyframes.currentKeyframe,
  error: state.clips.createOrUpdateError,
  loading: state.clips.creatingOrUpdating,
  success: state.clips.createOrUpdateSuccess
});

export default connect(mapStateToProps)(SaveClipModal);
