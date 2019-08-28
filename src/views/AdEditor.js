import React from "react";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/VideosList";
import VideoEditor from "../components/VideoEditor";
import Framer from "../components/Framer";
import AdAssets from "../components/AdAssets";
import KeyframesList from "../components/KeyframesList";
//import './App.css';

class AdEditor extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <VideosList />
        </Grid.Column>
        <Grid.Column width={8}>
          <VideoEditor />
          <Framer />
          <AdAssets />
        </Grid.Column>
        <Grid.Column width={4}>
          <KeyframesList />
        </Grid.Column>
      </Grid.Row>
    );
  }
}
export default AdEditor;
