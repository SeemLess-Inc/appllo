import React from "react";
import { Item, Accordion, Checkbox } from "semantic-ui-react";
import KeyframeHumansForm from "./KeyframeHumansForm";
import KeyframeBrandContentForm from "./KeyframeBrandContentForm";
import KeyframeContextForm from "./KeyframeContextForm";

function KeyframeItem({ keyframe }) {
  // Inspect data
  const src = keyframe[1];

  const hasBrands = src.brands.length;
  const hasContext = src.context.length;
  const hasHumans = src.humans.length;

  // Format Output
  const title = "Keyframe: " + src.frame_time;

  // Content Panels
  const humansContent = <KeyframeHumansForm data={src.humans} />;
  const brandContent = <KeyframeBrandContentForm data={src.brands} />;
  const contextContent = <KeyframeContextForm data={src.context} />;

  const keyframePanels = [];
  // Brands Panel
  if (hasBrands) {
    keyframePanels.push({
      key: "panel-1a",
      title: "BRAND CONTENT",
      content: { content: brandContent }
    });
  }
  // Context Panel
  if (hasContext) {
    keyframePanels.push({
      key: "panel-1b",
      title: "CONTEXT",
      content: { content: contextContent }
    });
  }

  // Humans Panel
  if (hasHumans) {
    keyframePanels.push({
      key: "panel-1d",
      title: "HUMANS",
      content: { content: humansContent }
    });
  }

  return (
    <Item>
      <Checkbox />
      <Item.Content style={{ paddingLeft: "1em" }}>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>Time: {src.frame_time}</Item.Meta>
        <Accordion
          fluid
          exclusive={false}
          defaultActiveIndex={[]}
          panels={keyframePanels}
        ></Accordion>
      </Item.Content>
    </Item>
  );
}

export default KeyframeItem;
