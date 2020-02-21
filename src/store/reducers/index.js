import { combineReducers } from "redux";
import videos from "./videosReducer";
import keyframes from './keyframesReducer';
import clips from './clipsReducer';
import saveKeyframes from './saveKeyframesReducer';
import currentVideo from './currentVideoReducer';
import videosToUpload from './uploadVideosReducer';
import videoToAnalyse from './analyseVideoReducer';

const rootReducer = combineReducers({
  videos, 
  keyframes,
  clips,
  saveKeyframes,
  currentVideo,
  videosToUpload,
  videoToAnalyse
});

export default rootReducer;
