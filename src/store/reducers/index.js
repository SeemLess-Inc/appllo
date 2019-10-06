import { combineReducers } from "redux";
import videos from "./videosReducer";
import keyframes from './keyframesReducer';
import currentVideo from './currentVideoReducer';
import videosToUpload from './videosToUploadReducer'
import videoToAnalyse from './videoToAnalyseReducer'

const rootReducer = combineReducers({
  videos, 
  keyframes, 
  currentVideo,
  videosToUpload,
  videoToAnalyse
});

export default rootReducer;
