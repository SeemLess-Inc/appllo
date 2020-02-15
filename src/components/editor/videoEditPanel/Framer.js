import React from "react";
import { Menu, Grid, Divider, Header, Segment, Item } from "semantic-ui-react";
import Draggable, { DraggableCore } from 'react-draggable';
import { StartFrame, EndFrame } from '../../FramerDemo/components';
import './Framer.css';
class Framer extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Menu secondary>
              <Header fitted sub header as="h3">
                Framer
              </Header>
              <Menu.Menu position="right">
                <Menu.Item>Keyframe 3</Menu.Item>
                <Menu.Item>33 sec</Menu.Item>
                <Menu.Item header>33:12 - 34:45</Menu.Item>
              </Menu.Menu>
            </Menu>
            <div style={{ height: 100,}}>
              <StartFrame
                array={this.props.array}
                startDisplayFlag={this.props.startDisplayFlag}
                CURRENT_START_DURATION={this.props.CURRENT_START_DURATION}
                startPoint={this.props.startPoint}
              />
              <EndFrame
                array={this.props.array}
                endDisplayFlag={this.props.endDisplayFlag}
                CURRENT_END_DURATION={this.props.CURRENT_END_DURATION}
                draggedPoint={this.props.draggedPoint}
              />
              <div id="videoFrames" className="videoFrames" style={{ height: 70, width: this.props.FRAME_WIDTH, padding: 0 }}>
                {
                  this.props.array.length !== 0 &&
                  <Item style={{ position: 'absolute', left: 0}}>
                    <Draggable
                      axis="x"
                      defaultPosition={{ x: this.props.startPoint, y: 0 }}
                      grid={[1, 0]}
                      scale={1}
                      onDrag={this.props.onstartPointControlledDrag}
                      onStop={this.props.handleStartPoint_Stop}
                    >
                      <div>
                        <Item style={{ borderRadius: 2, backgroundColor: '#f3c101', height: 70, width: 5, position: 'absolute', left: 0, bottom: 5 }} /* className="handle" */></Item>
                      </div>
                    </Draggable>
                    <Draggable
                      axis="x"
                      defaultPosition={{ x: this.props.draggedPoint, y: 0 }}
                      grid={[1, 0]}
                      scale={1}
                      onDrag={this.props.onControlledDrag}
                      onStop={this.props.handleStop}
                    >
                      <Item style={{ borderRadius: 2, backgroundColor: '#f3c101', height: 70, width: 5, position: 'absolute', left: 0, bottom: 5 }} /* className="handle" */></Item>
                    </Draggable>
                  </Item>
                }
              </div>
            </div>
            <Divider />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
export default Framer;
