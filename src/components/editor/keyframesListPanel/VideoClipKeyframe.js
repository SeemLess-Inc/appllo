import React from "react";
import { Item, Accordion, List } from "semantic-ui-react";


const VideoClipKeyframe = ({keyframe}) => {

  if (keyframe[0] === null) return null;

  // Inspect data
  const src = keyframe[1];
  const hasBrands = src.brands.length;
  const hasContext = src.context.length;
  const hasHumans = src.humans.length;

  // Format Output
  const title = "Keyframe: " + src.frame_time;

  const keyframePanels = [];
  if (hasBrands) {
    keyframePanels.push({
      key: "panel-1a",
      title: "BRAND CONTENT",
      content: { content: (
          <List>
            {src.brands.map((item, index) => (
              <List.Item key={index}>
                <List.Header>{item.brand_category_name}</List.Header>
                {item.label} ({item.confidence}%)
              </List.Item>
            ))}
          </List>
        )}
    });
  }

  if (hasContext) {
    keyframePanels.push({
      key: "panel-1b",
      title: "CONTEXT",
      content: { content:(
          <List>
            {src.context.map((item, index) => (
              <List.Item key={index}>
                <List.Header>{item.category}</List.Header>
                {item.label} ({item.confidence}%)
              </List.Item>
            ))}
          </List>
        )}
    });
  }

  if (hasHumans) {
    keyframePanels.push({
      key: "panel-1d",
      title: "HUMANS",
      content: { content:
          <List>
            <List.Item>
              <List.Header>Age</List.Header>
              {src.humans[0].age}
            </List.Item>
            <List.Item>
              <List.Header>Ethnicity</List.Header>
              {src.humans[0].ethnicity}
            </List.Item>
            <List.Item>
              <List.Header>Gender</List.Header>
              {src.humans[0].gender}
            </List.Item>
          </List>
      }
    });
  }

  return (<Accordion
    className='pretty-accordion video-clip-keyframe-accordion'
    fluid
    exclusive={false}
    panels={[{
      key: 1,
      title,
      content: { content: <>
          <Item.Meta style={{fontSize: '11px', lineHeight: '11px'}}>Duration: {src.frame_time}</Item.Meta>
          <Accordion className='pretty-accordion'
                     fluid
                     exclusive={false}
                     defaultActiveIndex={[0, 1, 2]}
                     panels={keyframePanels}
          />
        </> }
    }]}
  >
  </Accordion>)
};

export default VideoClipKeyframe;
