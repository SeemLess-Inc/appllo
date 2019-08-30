import React from "react";
import { Form, Dropdown, Label, Icon } from "semantic-ui-react";

function KeyframeHumansForm(props) {
  //  const tags = props.tags;

  const optionsAge = [
    { key: 0, value: 0, text: "age 20-29" },
    { key: 1, value: 1, text: "age 20-29" }
  ];
  const optionsRace = [
    { key: 0, value: 0, text: "white" },
    { key: 1, value: 1, text: "white" }
  ];
  const optionsGender = [
    { key: 0, value: 0, text: "female" },
    { key: 1, value: 1, text: "male" }
  ];
  const optionsActivity = [
    { key: 0, value: 0, text: "activity" },
    { key: 1, value: 1, text: "activity" }
  ];

  return (
    <Form>
      <Dropdown
        placeholder={optionsAge[0].text}
        selection
        options={optionsAge}
      />
      <Dropdown
        placeholder={optionsRace[0].text}
        selection
        options={optionsRace}
      />
      <Dropdown
        placeholder={optionsGender[0].text}
        selection
        options={optionsGender}
      />
      <Dropdown
        placeholder={optionsActivity[0].text}
        selection
        options={optionsActivity}
      />
      <Form.Group grouped>
        <h5>tags</h5>
        <Label.Group>
        <Label as="a">
            athletic
            <Icon name="close" />
          </Label>
          <Label as="a">
            smiling
            <Icon name="close" />
          </Label>
        </Label.Group>
      </Form.Group>
    </Form>
  );
}

export default KeyframeHumansForm;
