import React from "react";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/editor/videoListPanel";
import VideoEditor from "../components/editor/videoEditPanel/VideoEditor";
import Framer from "../components/editor/videoEditPanel/Framer";
import AdAssets from "../components/editor/videoEditPanel/AdAssets";
import KeyframesList from "../components/editor/keyframesListPanel";
//import './App.css';

const AdEditor = () => {
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
};
export default AdEditor;
