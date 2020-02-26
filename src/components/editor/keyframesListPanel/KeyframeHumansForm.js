import React, { useEffect, useState } from "react";
import { Form, Dropdown } from "semantic-ui-react";

function KeyframeHumansForm(props) {
  /*
Example data:
{
  "age": "20-29",
  "ethnicity": "white",
  "ethnicity_confidence": 68,
  "gender": "female",
  "gender_confidence": 99,
  "human_confidence": 97,
  "tag_location": [
      44,
      23,
      8,
      15
  ]
}
*/

  // Netra classes
  const netraAges = [
    "0-12",
    "13-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60+"
  ];
  const netraEthnicity = [
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "White",
    "South Asian"
  ];
  const netraGenders = ["Male", "Female"];

  // Inspect data
  const humans = props.data;
  //  const totalItems = humans.length;

  const [human, setHuman] = useState(humans[0]);
  useEffect(() => { setHuman(humans[0]) }, [humans[0]]);

  // Age Options
  const optionsAge = [];
  netraAges.forEach(function(item, i) {
    optionsAge.push({ key: i, value: item.toLowerCase(), text: item });
  });

  // Ethnicity Options
  const optionsRace = [];
  netraEthnicity.forEach(function(item, i) {
    optionsRace.push({ key: i, value: item.toLowerCase(), text: item });
  });

  // Gender Options
  const optionsGender = [];
  netraGenders.forEach(function(item, i) {
    optionsGender.push({ key: i, value: item.toLowerCase(), text: item });
  });

  return (
    <Form>
      <Dropdown
        placeholder={optionsAge[0].text}
        selection
        options={optionsAge}
        value={human.age}
        onChange={(e, {value}) => {
          setHuman({age: value});
        }}
      />
      <Dropdown
        placeholder={optionsRace[0].text}
        selection
        options={optionsRace}
        value={human.ethnicity}
        onChange={(e, {value}) => {
          setHuman({ethnicity: value});
        }}
      />
      <Dropdown
        placeholder={optionsGender[0].text}
        selection
        options={optionsGender}
        value={human.gender}
        onChange={(e, {value}) => {
          setHuman({gender: value});
        }}
      />
    </Form>
  );
}

export default KeyframeHumansForm;
