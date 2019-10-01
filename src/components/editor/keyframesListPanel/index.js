import React from "react";
import { connect } from "react-redux";
import { getKeyframes } from "../../../store/actions/keyframesActions";
import {
  Header,
  Grid,
  Icon,
  Divider,
  Item,
  Dimmer,
  Loader
} from "semantic-ui-react";
import KeyframeItem from "./KeyframeItem";

class KeyframesListPanel extends React.Component {

  componentDidMount() {
  //  this.props.dispatch(getKeyframes());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideo.id !== this.props.currentVideo.id) {
//      console.log( "Updated: " + this.props.currentVideo.id)
      this.props.dispatch(getKeyframes( this.props.currentVideo.id ));
    }
  }

  render() {
    const { error, loading, keyframes } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <Dimmer active inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
            <Header size="medium">Keyframes</Header>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <Icon name="plus circle" size='large' />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row style={{ margin: 14 }}>
          <Item.Group divided>
            {keyframes.map(keyframe => {
              return <KeyframeItem keyframe={keyframe} key={keyframe[0]} />;
            })}
          </Item.Group>
        </Grid.Row>
      </Grid>
    );
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
)(KeyframesListPanel);
