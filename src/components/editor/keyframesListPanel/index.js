import React from "react";
import { connect } from "react-redux";
import {
  getKeyframes,
  updateKeyframeUserApproved
} from "../../../store/actions/keyframesActions";
import {Header, Grid, Divider, Item, Loader, Button, TabPane, Tab} from "semantic-ui-react";
import KeyframeItem from "./KeyframeItem";
import "../styles.css"
import "./index.css"

class KeyframesListPanel extends React.Component {
  state = { activeIndex: 0 }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideo.id !== this.props.currentVideo.id) {
      this.props.dispatch(getKeyframes(this.props.currentVideo));
    }
  }

  toggleUserAccepted = src => {
    let id = src[0];
    let newValue = !src[1].userApproved;
    this.props.dispatch(updateKeyframeUserApproved(id, newValue));
  };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { error, loading, keyframes, currentVideo } = this.props;
    const { activeIndex } = this.state

    const addKeyframeButton = currentVideo.id
      ? <Button icon='plus' size='tiny' color='blue' basic circular compact onClick={() => (alert('Coming soon'))} />
      : <div/>;

    var renderList;
    if (keyframes.length === 0) {
      renderList = <p>No suitable keyframes available</p>;
    } else {
      renderList = (
        <Item.Group divided className='divided-items-ellipsis'>
          {keyframes.map(keyframe => {
            return (
              <KeyframeItem
                keyframe={keyframe}
                onToggle={this.toggleUserAccepted}
                key={keyframe[0]}
              />
            );
          })}
        </Item.Group>
      );
    }

    if (error !== null) {
      return <div>Error! {error.message}</div>;
    } else if (loading === true) {
      return <Loader active>Loading</Loader>;
    } else {
      return (
        <Grid stackable columns={2}>
          <Grid.Row className='top-action-container'>
            <Grid.Column>
              <Header sub color='grey'>Keyframes</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button basic compact color='grey'>Export...</Button>
              {addKeyframeButton}
            </Grid.Column>
              <Tab
              className='keyframe-tabs'
              menu={{ secondary: true, pointing: true }}
              panes={[{ menuItem: 'Netra' }, { menuItem: 'Custom' }]}
              activeIndex={activeIndex}
              onTabChange={this.handleTabChange}
              />
          </Grid.Row>
          <Grid.Row className='mini-vertical-scroll scroll-panes'>{ (activeIndex === 0)
            ? renderList
            : <p>Coming Soon</p>
          }</Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items.sort((a, b) => a[1].frame_time - b[1].frame_time ),
  loading: state.keyframes.loading,
  error: state.keyframes.error
});
export default connect(
  mapStateToProps
  //  { getKeyframes, updateKeyframeUserApproved } // mapDispatchToProps
)(KeyframesListPanel);
