import React from "react";
import { Grid } from "semantic-ui-react";
import TopMenu from "./components/TopMenu";
import VideosList from "./components/VideosList";
import VideoEdit from "./components/VideoEdit";
import Framer from "./components/Framer"
import AdAssets from "./components/AdAssets"
import KeyframesList from "./components/KeyframesList";
import "./assets/fomantic/dist/semantic.css";
//import './App.css';

class App extends React.Component {
  render() {
    return (
      <Grid fluid celled style={{ marginTop: 0 }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <TopMenu />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <VideosList />
          </Grid.Column>
          <Grid.Column width={8}>
            <VideoEdit />
            <Framer />
            <AdAssets />
          </Grid.Column>
          <Grid.Column width={4}>
            <KeyframesList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default App;
