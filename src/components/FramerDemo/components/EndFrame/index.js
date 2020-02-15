import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import './EndFrame.css';
export class EndFrame extends React.Component {
    render() {
        const { array, endDisplayFlag, CURRENT_END_DURATION, draggedPoint } = this.props;
        return (
            <div>
                {/* {array.length !== 0 &&
                    <Item className="markUpperCap" style={{left:draggedPoint-4.3}}></Item>
                } */}
                {endDisplayFlag &&
                    <Item className="displayEndFrame" id="displayEndFrame" style={{left:draggedPoint-90}} ></Item>
                }
                {endDisplayFlag &&
                    <Label className="end-duration" style={{left:draggedPoint+10}}>{CURRENT_END_DURATION}&nbsp;s</Label>
                }
                {/* {array.length !== 0 &&
                    <Item className="markBottomCap" style={{left:draggedPoint-4.3}}></Item>
                } */}
            </div>
        );
    }
}
