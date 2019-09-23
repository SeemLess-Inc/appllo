import React from "react";
import { List } from "semantic-ui-react";

function KeyframeContextForm(props) {
  /*
Example data:
        "context": [
            {
                "category": "Text & Signage (Letters / Numbers / Words)",
                "confidence": 90,
                "label": "text"
            },
            {
                "category": "Text & Signage (Letters / Numbers / Words)",
                "confidence": 83,
                "label": "font"
            },
            {
                "category": "NSFW",
                "confidence": 52,
                "label": "NSFW"
            },
            {
                "category": "People & Relationships (People)",
                "confidence": 80,
                "label": "sitting"
            }

        ],
*/

  // Inspect data
  const src = props.data;
//  const totalItems = src.length;

  return (
    <List>
      {src.map((item, index) => {
        return (
          <List.Item key={index}>
            <List.Header>{item.category}</List.Header>
            {item.label} ({item.confidence}%)
          </List.Item>
        );
      })}
    </List>
  );
}

export default KeyframeContextForm;
