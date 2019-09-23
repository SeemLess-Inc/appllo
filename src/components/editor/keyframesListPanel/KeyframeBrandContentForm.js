import React from "react";
import { List } from "semantic-ui-react";

function KeyframeBrandContentForm(props) {

/*
Example data:
        "brands": [
            {
                "brand_category_id": 130,
                "brand_category_name": "Fitness Apparel",
                "brand_id": 10491,
                "confidence": 100,
                "label": "Nike",
                "tag_location": [
                    1024,
                    493,
                    156,
                    162
                ]
            },
            {
                "brand_category_id": 130,
                "brand_category_name": "Fitness Apparel",
                "brand_id": 10491,
                "confidence": 100,
                "label": "Nike",
                "tag_location": [
                    473,
                    358,
                    115,
                    131
                ]
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
            <List.Header>{item.brand_category_name}</List.Header>
            {item.label} ({item.confidence}%)
          </List.Item>
        );
      })}
    </List>
  );
}
export default KeyframeBrandContentForm;
