import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import './styles.css';
export class StartFrame extends React.Component {
    render() {
        const { array, startDisplayFlag, CURRENT_START_DURATION, startPoint } = this.props;
        return (
            <div>
                {/* {array.length !== 0 &&
                    <Item className="markUpperCap" style={{ left: startPoint - 4.3,position:'absolute',bottom:0,left:0,width:0,
                    height:0,
                    borderLeft:'7px solid transparent',
                    borderRight:'7px solid transparent',
                    borderTop:'14px solid red'}}></Item>
                } */}
                {startDisplayFlag &&
                    <Item style={{ left: startPoint - 90 }} className="displayStartFrame" id="displayStartFrame"></Item>
                }
                {startDisplayFlag &&
                    <Label className="start-duration" style={{ left: startPoint + 10 }}>{CURRENT_START_DURATION}&nbsp;s</Label>
                }
                {/* {array.length !== 0 &&
                    <Item className="markBottomCap" style={{ left: startPoint - 4.3 }}></Item>
                } */}
            </div>
        );
    }
}
