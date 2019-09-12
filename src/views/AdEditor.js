import React from "react";
import { Grid } from "semantic-ui-react";
import VideosList from "../components/videoList/VideosList";
import VideoEditor from "../components/videoEdit/VideoEditor";
import Framer from "../components/videoEdit/Framer";
import AdAssets from "../components/videoEdit/AdAssets";
import KeyframesList from "../components/keyframes/KeyframesList";
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
