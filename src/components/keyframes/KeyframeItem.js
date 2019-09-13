import React from "react";
import { Item, Accordion, Checkbox } from "semantic-ui-react";
import KeyframeHumansForm from "./KeyframeHumansForm";
import KeyframeBrandContentForm from "./KeyframeBrandContentForm";
import KeyframeAssetAttributionForm from "./KeyframeAssetAttributionForm";

function KeyframeItem({ keyframe }) {
  const humansContent = <KeyframeHumansForm />;
  const brandContent = <KeyframeBrandContentForm />;
  const assetContent = <KeyframeAssetAttributionForm />;
  const keyframePanels = [
    { key: "panel-1a", title: "HUMANS", content: { content: humansContent } },
    {
      key: "panel-1b",
      title: "BRAND CONTENT",
      content: { content: brandContent }
    },
    {
      key: "panel-1c",
      title: "ASSET ATTRIBUTION",
      content: { content: assetContent }
    }
  ];

  const KeyframeContent = <Accordion.Accordion panels={keyframePanels} />;
  const rootPanels = [
    {
      key: "panel-tags",
      title: keyframe.description,
      content: { content: KeyframeContent }
    }
  ];

  return (
    <Item>
      <Checkbox label=" " />
      <Item.Content>
        <Item.Header>{keyframe.title}</Item.Header>
        <Item.Meta>{keyframe.timespan}</Item.Meta>
        <Accordion defaultActiveIndex={1} panels={rootPanels}></Accordion>
      </Item.Content>
    </Item>
  );
}

export default KeyframeItem;
