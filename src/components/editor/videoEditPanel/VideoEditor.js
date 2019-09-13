import React from "react";
import { Header, Grid, Divider, Button, Container } from "semantic-ui-react";
import VideoApp from './VideoApp'

const VideoEditor = () => (
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
      <Grid.Column width={16}>
        <Container>
        <VideoApp></VideoApp>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default VideoEditor;