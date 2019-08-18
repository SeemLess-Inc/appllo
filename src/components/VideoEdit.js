import React from "react";
import { Header, Grid, Divider, Button, Embed } from "semantic-ui-react";

const VideoEdit = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={12}>
        <Header size="medium">
          Big Little Lies
          <Header.Subheader>May 6, 2019</Header.Subheader>
        </Header>
      </Grid.Column>
      <Grid.Column width={4} textAlign="right">
        <Button>Save</Button>
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Grid.Row>
      <Grid.Column width={12}>
        <Embed id="45cYwDMibGo" placeholder="/video.png" source="youtube" brandedUI='false'/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default VideoEdit;
