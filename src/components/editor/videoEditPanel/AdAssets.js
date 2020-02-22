import React from "react";
import { Button, Grid, Menu, Divider, Header, Segment } from "semantic-ui-react";

const AdAssets = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={4}>
        <Header fitted sub header as="h3">
            Media Assets
        </Header>
      </Grid.Column>
      <Grid.Column width={12}>
        
    <Button floated='right' basic circular icon='plus' size='tiny' color='blue'  compact onClick={() => (alert('Coming soon'))} />
      </Grid.Column>
    </Grid.Row>    
      <Grid.Row style={{padding: '0'}}>
        <Grid.Column>    
        <Segment style={{height: '80px'}}></Segment>
        </Grid.Column>
    </Grid.Row>
     
  </Grid>
);

export default AdAssets;
