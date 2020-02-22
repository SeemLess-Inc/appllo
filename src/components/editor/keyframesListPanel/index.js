import React from "react";
import { connect } from "react-redux";
import { fetchClips } from "../../../store/actions/clipsActions";
import {
  getKeyframes,
  updateKeyframeUserApproved
} from "../../../store/actions/keyframesActions";
import { Header, Grid, Item, Loader, Button, Tab } from "semantic-ui-react";
import { saveKeyframesMarkDirty } from "../../../store/actions/saveKeyframesActions";
import KeyframeItem from "./KeyframeItem";
import VideoClipItem from "./VideoClipItem";
import "../styles.css"
import "./index.css"

class KeyframesListPanel extends React.Component {
  state = { activeIndex: 0 }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideo.id !== this.props.currentVideo.id) {
      this.props.dispatch(getKeyframes(this.props.currentVideo));
      this.props.dispatch(fetchClips(this.props.currentVideo));
    }
    if (prevProps.createOrUpdateSuccess !== this.props.createOrUpdateSuccess && this.props.createOrUpdateSuccess) {
      this.setState({ activeIndex: 1 })
    }
  }

  toggleUserAccepted = src => {
    let id = src[0];
    let newValue = !src[1].userApproved;
    this.props.dispatch(updateKeyframeUserApproved(id, newValue));
    this.props.dispatch(saveKeyframesMarkDirty(true));
  };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { error, loading, keyframes, currentVideo, clips } = this.props;
    const { activeIndex } = this.state

    if (error !== null) {
      return <div>Error! {error.message}</div>;
    } else if (loading === true) {
      return <Loader active>Loading</Loader>;
    } else {
      return (
        <Grid stackable columns={2}>
          <Grid.Row className='top-action-container'>
            <Grid.Column>
              <Header sub color='grey'>Ad Placement</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button basic compact color='grey'>Export...</Button>
              <Button icon='plus' size='tiny' color='blue' disabled={!(currentVideo.id)} basic circular compact onClick={() => (alert('Coming soon'))} />
            </Grid.Column>
              <Tab
              className='keyframe-tabs'
              menu={{ secondary: true, pointing: true }}
              panes={[{ menuItem: 'Keyframes' }, { menuItem: 'Clips' }]}
              activeIndex={activeIndex}
              onTabChange={this.handleTabChange}
              />
          </Grid.Row>
          <Grid.Row className='mini-vertical-scroll scroll-panes'>
            <Item.Group divided className='divided-items-ellipsis'>
              { (!activeIndex)
                ?  keyframes.length
                  ? keyframes.map(keyframe => <KeyframeItem keyframe={keyframe} onToggle={this.toggleUserAccepted} key={keyframe[0]}/>)
                  : <Item>No suitable keyframes available</Item>
                : clips.length
                  ? clips.map(clip => <VideoClipItem clip={clip} key={clip.id} />)
                  : <Item>No suitable clips available</Item>
              }
            </Item.Group>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => ({
  clips: state.clips.items,
  createOrUpdateSuccess: state.clips.createOrUpdateSuccess,
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items.sort((a, b) => a[1].frame_time - b[1].frame_time ),
  loading: state.keyframes.loading,
  error: state.keyframes.error
});
export default connect(
  mapStateToProps
  //  { getKeyframes, updateKeyframeUserApproved } // mapDispatchToProps
)(KeyframesListPanel);
