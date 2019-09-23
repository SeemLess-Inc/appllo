import React from "react";
import { List } from "semantic-ui-react";

function KeyframeContextHierarchyForm(props) {
  /*
Example data:
 "context_hierarchy": {
            "Restaurants & Retail": {
                "Retail": {
                    "Brand": [
                        "brand"
                    ]
                }
            },
            "Text & Signage": {
                "Letters, Numbers, Words": {
                    "Text": [
                        "text",
                        "font"
                    ]
                }
            }
        },
*/

  // Inspect data
  const src = JSON.stringify(props.data);

  // HACK: This is just temp so Keara can see the data. UX will be properly designed to allow for user selection. 
  // Special case for ,
  var regex1 = /"Letters, Numbers, Words"/gi;
  const src2 = src.replace(regex1, "Letters Numbers Words");
  var regex2 = /"text",/gi;
  const src3 = src2.replace(regex2, "text ");

  // format data
  const labels = src3.split(",");
  const items = labels.map(function(label) {
    var regex1 = /{/gi;
    label = label.replace(regex1, "");
    var regex2 = /}/gi;
    label = label.replace(regex2, "");
    var regex3 = /"/gi;
    label = label.replace(regex3, "");
    var regex4 = /:/gi;
    label = label.replace(regex4, " > ");
    return label;
  });

  return (
    <List as="ul">
      {items.map((label, index) => {
        return (
          <List.Item as="li" key={index}>
            {label}
          </List.Item>
        );
      })}
    </List>
  );
}

export default KeyframeContextHierarchyForm;
