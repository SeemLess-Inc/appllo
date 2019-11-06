import React from "react";
import { connect } from "react-redux";
import {
  getKeyframes,
  updateKeyframeUserApproved
} from "../../../store/actions/keyframesActions";
import { Header, Grid, Icon, Divider, Item, Loader } from "semantic-ui-react";
import KeyframeItem from "./KeyframeItem";

class KeyframesListPanel extends React.Component {
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

  render() {
    const { error, loading, keyframes } = this.props;

    var renderList;
    if (keyframes.length === 0) {
      renderList = <p>No suitable keyframes available</p>;
    } else {
      renderList = (
        <Item.Group divided>
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

    if (error === true) {
      return <div>Error! {error.message}</div>;
    } else if (loading === true) {
      return <Loader active>Loading</Loader>;
    } else {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header size="medium">Keyframes</Header>
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
              <Icon name="plus circle" size="large" />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row style={{ margin: 14 }}>{renderList}</Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => ({
  currentVideo: state.currentVideo,
  keyframes: state.keyframes.items,
  loading: state.keyframes.loading,
  error: state.keyframes.error
});
export default connect(
  mapStateToProps
  //  { getKeyframes, updateKeyframeUserApproved } // mapDispatchToProps
)(KeyframesListPanel);
