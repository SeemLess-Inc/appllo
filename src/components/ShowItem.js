import React from "react";
import { Item, Accordion, Icon } from "semantic-ui-react";
import KeyframeHumansForm from "./keyframes/KeyframeHumansForm";
import KeyframeBrandContentForm from "./keyframes/KeyframeBrandContentForm";
import KeyframeAssetAttributionForm from "./keyframes/KeyframeAssetAttributionForm";

class ShowItem extends React.Component {
  render() {
    const showData = this.props.showData;

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
        title: showData.title,
        content: { content: KeyframeContent }
      }
    ];

    return (
      <Item>
        <Item.Content>
          <Item.Header>
          <Icon name='folder outline' />
          {showData.title}</Item.Header>
          <Accordion defaultActiveIndex={1} panels={rootPanels}></Accordion>
        </Item.Content>
      </Item>
    );
  }
}

export default ShowItem;
