import React from "react";
import { Form } from "semantic-ui-react";

function KeyframeAssetAttributionForm(props) {
  //  const tags = props.tags;

  return (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox label="iMac-with-laptop.png" name="0" value="0" />
        <Form.Checkbox label="Apple-shopping-bag" name="1" value="1" />
      </Form.Group>
    </Form>
  );
}

export default KeyframeAssetAttributionForm;
