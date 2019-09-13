import React from "react";
import { connect } from "react-redux";
import { fetchKeyframes } from "../../../store/actions/keyframesActions";
import { Header, Grid, Icon, Divider, Item } from "semantic-ui-react";
import KeyframeItem from "./KeyframeItem";

class KeyframesListPanel extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchKeyframes());
  }

  render() {
    const { error, loading, keyframes } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={14}>
          <Header size="medium">Keyframes</Header>
        </Grid.Column>
        <Grid.Column width={2} textAlign="right">
          <Icon name="plus circle" />
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row style={{ margin: 14 }}>
        <Item.Group divided>
          {keyframes.map(keyframe => {
            return <KeyframeItem keyframe={keyframe} key={keyframe.id} />;
          })}
        </Item.Group>
      </Grid.Row>
    </Grid>
  );
}
}
const mapStateToProps = state => ({
  keyframes: state.keyframes.items,
  loading: state.keyframes.loading,
  error: state.keyframes.error
});

export default connect(mapStateToProps)(KeyframesListPanel);

