import React from "react";
import { Item, Accordion, Checkbox } from "semantic-ui-react";
import KeyframeHumansForm from "./KeyframeHumansForm";
import KeyframeBrandContentForm from "./KeyframeBrandContentForm";
import KeyframeContextForm from "./KeyframeContextForm";
//import KeyframeContextHierarchyForm from "./KeyframeContextHierarchyForm";
//import KeyframeAssetAttributionForm from "./KeyframeAssetAttributionForm";

function KeyframeItem({ keyframe }) {
/*
  // util
  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
*/
  // Inspect data
  const src = keyframe[1];
  const hasBrands = src.brands.length;
  const hasContext = src.context.length;
//  const hasContextHierarchy = !isObjectEmpty(src.context_hierarchy);
  const hasHumans = src.humans.length;

  // Format Output
  const title = "Keyframe"; //+ keyframe[0]
  const startTime = src["start time"];
  const endTime = src["end time"];

  // Content Panels
  const humansContent = <KeyframeHumansForm data={src.humans} />;
  const brandContent = <KeyframeBrandContentForm data={src.brands} />;
  const contextContent = <KeyframeContextForm data={src.context} />;

//  const context_hierarchyContent = ( <KeyframeContextHierarchyForm data={src.context_hierarchy} /> );

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

  // Context Heirerchy Panel
  /*
  if (hasContextHierarchy) {
    //    tagSummary += " Context Hierarchy, "
    keyframePanels.push({
      key: "panel-1c",
      title: "CONTEXT HIERARCHY",
      content: { content: context_hierarchyContent }
    });
  }
  */
  // Humans Panel
  if (hasHumans) {
    keyframePanels.push({
      key: "panel-1d",
      title: "HUMANS",
      content: { content: humansContent }
    });
  }

  /*
  // Root Panel
  const KeyframeContent = <Accordion.Accordion panels={keyframePanels} />;
  const rootPanels = [
    {
      key: "panel-tags",
      title: tagSummary,
      content: { content: KeyframeContent }
    }
  ];
*/
  return (
    <Item>
      <Checkbox label=" " />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>Start: {startTime}</Item.Meta>
        <Item.Meta>End: {endTime}</Item.Meta>
        <Accordion fluid exclusive={false} defaultActiveIndex={[]} panels={keyframePanels}></Accordion>
      </Item.Content>
    </Item>
  );
}

export default KeyframeItem;
