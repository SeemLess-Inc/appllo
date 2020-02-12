import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { Button, Item, Label, Container } from 'semantic-ui-react';
import Paper from '@material-ui/core/Paper';
import { Grid } from "semantic-ui-react";
import './styles.css';
import { StartFrame, EndFrame } from '../components';

var array = [];
var videoDuration = null;
var noOfFrames = 0;
var CURRENT_START_DURATION = 0;
var CURRENT_END_DURATION = 0;
var FRAME_WIDTH = (3 * window.innerWidth / 4)-25;
export default class VideoEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        controlledPosition: {
            x: -400, y: 200
        },
        startPoint_controlledPosition: {
            x: -400, y: 200
        },
        selectedFrame: null,
        draggedPoint: 0,
        startPoint: 0,
        clicked: false,
        noOfCutFrames: 0,
        videoDuration: null,
        draggingPoint: 'start',
    };

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);

        this.getClickPosition = this.getClickPosition.bind(this);
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = document.querySelector('input').addEventListener('change', this.extractFrames);
        this.instance.appendChild(s);

        const clickListener = document.createElement('script');
        clickListener.type = 'text/javascript';
        clickListener.async = true;
        clickListener.innerHTML = document.getElementById('videoFrames').addEventListener('click', this.getClickPosition);
        this.instance.appendChild(clickListener);
    }

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        if (x >= 0) {
            this.setState({ controlledPosition: { x, y }, draggedPoint: position.x, draggingPoint: 'end' }, () => {
                if (this.state.draggedPoint > 55 && this.state.draggedPoint < 1150) {
                    this.displayCurrentEndFrame();
                }
            });
        }
    };

    onstartPointControlledDrag = (e, position) => {
        const { x, y } = position;
        if (x >= 0) {
            this.setState({ startPoint_controlledPosition: { x, y }, startPoint: position.x, draggingPoint: 'start' }, () => {
                if (this.state.startPoint > 55 && this.state.startPoint < 1150) {
                    this.displayCurrentStartFrame();
                }
            });
        }
    };

    getClickPosition(e) {
        if (array.length !== 0 && !this.state.clicked) {
            var xPosition = e.clientX;
            if (!this.state.clicked) {
                this.setState({ startPoint: 0, draggedPoint: FRAME_WIDTH, clicked: true });
            }
        }
    }

    extractFrames() {
        var video = document.createElement('video');
        video.setAttribute("height", "500");
        video.setAttribute("width", "700");

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var pro = document.querySelector('#progress');

        function initCanvas(e) {
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
        }

        function drawFrame(e) {
            ctx.drawImage(this, 0, 0);
            canvas.toBlob(saveFrame, 'image/jpeg');
            pro.innerHTML = `<h3 style="color:#414141">` + ((this.currentTime / this.duration) * 100).toFixed(2) + ' %' + `</h3>`;
        }

        function saveFrame(blob) {
            array.push(blob);
        }

        function revokeURL(e) {
            URL.revokeObjectURL(this.src);
        }

        function onend(e) {
            var img;
            for (var i = 0; i < array.length; i++) {
                img = new Image();
                var img = document.createElement("IMG");
                img.onload = revokeURL;
                img.src = URL.createObjectURL(array[i]);
                img.setAttribute("src", URL.createObjectURL(array[i]));
                img.setAttribute("width", (Math.ceil(FRAME_WIDTH) / array.length).toFixed(2));
                img.setAttribute("height", "70");
                img.setAttribute("display", "inline-block");
                var videoFramDiv = document.getElementById('videoFrames');
                videoFramDiv.appendChild(img);
            }
            URL.revokeObjectURL(this.src);
            var videoFramDiv = document.getElementById('videoFrames');
            videoFramDiv.appendChild(img);
        }

        video.muted = true;

        video.addEventListener('loadedmetadata', initCanvas, false);
        video.addEventListener('timeupdate', drawFrame, false);
        video.addEventListener('ended', onend, false);
        document.getElementById('videoPlay').appendChild(video);
        if (this.files.length !== 0) {
            video.src = URL.createObjectURL(this.files[0]);
            video.ondurationchange = function () {
                videoDuration = this.duration;
            };
            video.play();
        }
    }

    handleStop = () => {
        var draggedPoint = this.state.controlledPosition.x;
        this.setState({ draggedPoint: Math.ceil(draggedPoint), draggingPoint: null });
    }

    handleStartPoint_Stop = () => {
        var draggedPoint = this.state.startPoint_controlledPosition.x;
        this.setState({ startPoint: draggedPoint, draggingPoint: null });
    }

    displayCurrentStartFrame = () => {
        const { startPoint } = this.state;
        noOfFrames = array.length - 1;
        var framerate = videoDuration / noOfFrames;
        var startDuration = (startPoint / ((FRAME_WIDTH / array.length - 1)) * framerate).toFixed(2);
        CURRENT_START_DURATION = startDuration;

        if (array.length !== 0) {
            var selectedFrame = Math.floor((startPoint) / ((FRAME_WIDTH / array.length))) - 1;
            let imageView = this.getFrame(selectedFrame);
            var iDiv = document.createElement('div');
            iDiv.innerHTML = imageView;

            var selectedFrameDiv = document.getElementById('displayStartFrame');
            selectedFrameDiv.appendChild(iDiv);
        }
    }

    displayCurrentEndFrame = () => {
        const { draggedPoint } = this.state;
        noOfFrames = array.length - 1;
        var framerate = videoDuration / noOfFrames;
        var endDuration = (this.state.draggedPoint / ((FRAME_WIDTH / array.length - 1)) * framerate).toFixed(2);
        CURRENT_END_DURATION = endDuration;

        if (array.length !== 0) {
            var selectedFrame = Math.floor((draggedPoint) / ((FRAME_WIDTH / array.length))) - 1;
            let imageView = this.getFrame(selectedFrame);
            var iDiv = document.createElement('div');
            iDiv.innerHTML = imageView;
            var selectedFrameDiv = document.getElementById('displayEndFrame');
            selectedFrameDiv.appendChild(iDiv);
        }
    }

    getFrame = (selectedFrame) => {
        let frame = `<Item style="height:100px;position:absolute;left:0;border-radius:6px;box-shadow: 3px 3px 3px #414141;border: 1px dotted #f3c101;">
                <img src=${URL.createObjectURL(array[selectedFrame])} height="100px" width="170px" style="border-radius:6px">
            <Item/>`
        return frame;
    }

    cutFrame = () => {
        noOfFrames = array.length - 1;
        var framerate = videoDuration / noOfFrames;
        var startDuration = (this.state.startPoint / (FRAME_WIDTH / array.length - 1) * framerate).toFixed(2);
        var endDuration = (this.state.draggedPoint / (FRAME_WIDTH / array.length - 1) * framerate).toFixed(2);
        if (array.length !== 0) {
            this.setState({ noOfCutFrames: this.state.noOfCutFrames + 1 });
            var selectedFrame = Math.floor((this.state.startPoint) / ((FRAME_WIDTH / array.length))) - 1;
            let imageView = this.getFrameToCut(this.state.noOfCutFrames, selectedFrame, startDuration, endDuration);
            var iDiv = document.createElement('div');
            var selectedFrameDiv = document.getElementById('selectedFrame');
            iDiv.innerHTML = imageView;
            selectedFrameDiv.appendChild(iDiv);
        }
    }

    getFrameToCut = (noOfCutFrames, selectedFrame, startDuration, endDuration) => {
        let frameToCut = `<div>
    <h3 style="color:white">Frame ${noOfCutFrames}</h3>
    <img src=${URL.createObjectURL(array[selectedFrame])} height="100px" width="170px" style="border-radius:4px">
    <div style="height:16px;width:210px">
      <span style="color:white;font-size:14px">&#x1F552; Duration&nbsp;:&nbsp;&nbsp;
        <span style="color:#4285f4;font-size:14px">${startDuration} - ${endDuration} s</span>
      </span>
    <div>`;
        return frameToCut;
    }

    render() {
        const { draggingPoint, startPoint, draggedPoint, noOfCutFrames } = this.state;
        var startDisplayFlag = array.length !== 0 && draggingPoint !== null && draggingPoint === 'start';
        var endDisplayFlag = array.length !== 0 && draggingPoint !== null && draggingPoint === 'end';
        return (
            <div ref={el => (this.instance = el)}>
                <div style={styles.root}>
                    <Grid.Row width={12}>
                        <Grid.Column width={9}>
                            <div style={styles.paperCenter}>
                                <input type="file" accept="video/*" />
                                <Button primary onClick={this.cutFrame}>Cut Frame</Button>
                                <Label id="progress"></Label>
                                <Item id="videoPlay"></Item>
                                <div id="videoFrames" className="videoFrames" style={{ width: Math.ceil(FRAME_WIDTH) }}>
                                    {
                                        array.length !== 0 &&
                                        <Item>
                                            <Draggable
                                                axis="x"
                                                defaultPosition={{ x: startPoint, y: 0 }}
                                                grid={[1, 0]}
                                                scale={1}
                                                onDrag={this.onstartPointControlledDrag}
                                                onStop={this.handleStartPoint_Stop}
                                            >
                                                <Item className="handle"></Item>
                                            </Draggable>
                                            <Draggable
                                                axis="x"
                                                defaultPosition={{ x: draggedPoint, y: 0 }}
                                                grid={[1, 0]}
                                                scale={1}
                                                onDrag={this.onControlledDrag}
                                                onStop={this.handleStop}
                                            >
                                                <Item className="handle"></Item>
                                            </Draggable>
                                        </Item>
                                    }
                                </div>
                            </div>
                            <StartFrame
                                array={array}
                                startDisplayFlag={startDisplayFlag}
                                CURRENT_START_DURATION={CURRENT_START_DURATION}
                                startPoint={startPoint}
                            />
                            <EndFrame
                                array={array}
                                endDisplayFlag={endDisplayFlag}
                                CURRENT_END_DURATION={CURRENT_END_DURATION}
                                draggedPoint={draggedPoint}
                            />
                        </Grid.Column>
                        <Grid.Column width={2} style={{ height: window.innerHeight - 10, overflowY: 'auto', backgroundColor: '#272c34' }}>
                            <div style={styles.paperMargin}>
                                <h2 className="savedFrameTitle">Saved frames</h2>
                                {noOfCutFrames === 0 &&
                                    <Label className="noFrameLabel">Not yet saved any frame.</Label>
                                }
                                {array.length !== 0 &&
                                    <Item className="cutFrame" id="selectedFrame"></Item>
                                }
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </div>
            </div>
        );
    }
}

const styles = {
    root: {
        height: window.innerHeight - 30,
    },
    paper: {
        //padding: 10,
        height: window.innerHeight - 30,
        backgroundColor: '#272c34'
    },
    paperCenter: {
        //padding: 10,
        height: window.innerHeight - 30,
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
        //color: 'red',
    },
    paperMargin: {
        padding: 10,
        height: window.innerHeight - 30,
        backgroundColor: '#272c34'
    }
};