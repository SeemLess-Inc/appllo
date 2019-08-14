import React from "react";
import { Header, Grid, Divider, Button , Image} from "semantic-ui-react";

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
    <Image src='./video.png'></Image>
  </Grid>
);

export default VideoEdit;
