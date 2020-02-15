import React from "react";
import { List, Button, Grid, Divider, Header, Segment } from "semantic-ui-react";

const Framer = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
          <Header fitted sub header as="h3">
            Framer
          </Header>
          <List horizontal floated='left'>
            <List.Item>Keyframe 3</List.Item>
            <List.Item>1min 33sec</List.Item>
            <List.Item header>33:12 - 34:45</List.Item>
          </List>  
      </Grid.Column>
      <Grid.Column width={8}>      
          <Button floated='right' verticalAlign='top' basic compact color='blue'>Save Clip</Button>
          <Button floated='right' verticalAlign='top' basic compact color='grey'>Create Thumbnail</Button>
      </Grid.Column>
        
    </Grid.Row>
    <Grid.Row style={{padding: '0'}}>
      <Grid.Column>
      <Segment style={{height: '80px'}}></Segment>
      </Grid.Column>
    </Grid.Row>  
  </Grid>
);

export default Framer;
