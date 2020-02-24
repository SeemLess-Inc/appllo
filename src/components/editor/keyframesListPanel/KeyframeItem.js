import React from "react";
import {connect} from "react-redux";
import { Item, Header, Accordion, Checkbox } from "semantic-ui-react";
import {selectKeyframe} from "../../../store/actions/keyframesActions";
import KeyframeHumansForm from "./KeyframeHumansForm";
import KeyframeBrandContentForm from "./KeyframeBrandContentForm";
import KeyframeContextForm from "./KeyframeContextForm";
import "./KeyframeItem.css";

class KeyframeItem extends React.Component {
  constructor(props) {
    super(props);
    //To tell React to rerender on toggle
    this.state = { userApproved: this.props.keyframe[1].userApproved };
  }

  toggle = () => {
    // Tell parent that keyframe has been toggled.
    this.props.onToggle( this.props.keyframe );
    this.setState({ userApproved: !this.props.keyframe[1].userApproved });
  };

  render() {
    const { currentKeyframeId } = this.props
    
    // Inspect data
    const id = this.props.keyframe[0];
    const src = this.props.keyframe[1];
    const hasBrands = src.brands.length;
    const hasContext = src.context.length;
    const hasHumans = src.humans.length;

    // Format Output
    const title = "Keyframe: " + src.frame_time;

    // Content Panels
    const humansContent = <KeyframeHumansForm data={src.humans} />;
    const brandContent = <KeyframeBrandContentForm data={src.brands} />;
    const contextContent = <KeyframeContextForm data={src.context} />;
    const selectNewKeyframe = () => this.props.dispatch(selectKeyframe(this.props.keyframe));

    const keyframePanels = [];
    if (hasBrands) {
      keyframePanels.push({
        key: "panel-1a",
        title: "BRAND CONTENT",
        content: { content: brandContent }
      });
    }

    if (hasContext) {
      keyframePanels.push({
        key: "panel-1b",
        title: "CONTEXT",
        content: { content: contextContent }
      });
    }

    if (hasHumans) {
      keyframePanels.push({
        key: "panel-1d",
        title: "HUMANS",
        content: { content: humansContent }
      });
    }

    return (
      <Item className={currentKeyframeId === id && "active"}>
        <Checkbox onChange={this.toggle} checked={src.userApproved} />
        <Item.Image src={src.image_url} size='tiny' style={{ paddingLeft: "1em" }} />
        <Item.Content onClick={selectNewKeyframe}>
          <Header size='tiny' as="a" style={{paddingTop: '6px', lineHeight: '11px'}}>{title}</Header>
          <Item.Meta style={{fontSize: '11px', lineHeight: '11px'}}>Duration: {src.frame_time}</Item.Meta>
          <Accordion className='pretty-accordion'
            fluid
            exclusive={false}
            defaultActiveIndex={[0, 1, 2]}
            panels={keyframePanels}
          />
        </Item.Content>
      </Item>
    );
  }
}


const mapStateToProps = state => ({
  currentKeyframeId: state.keyframes.currentKeyframe[0]
});

export default connect(mapStateToProps)(KeyframeItem);
