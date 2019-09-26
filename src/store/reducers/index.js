import { combineReducers } from "redux";
import videos from "./videosReducer";
import keyframes from './keyframesReducer';
import currentVideo from './currentVideoReducer';
import videosToUpload from './videosToUploadReducer'

const rootReducer = combineReducers({
  videos, 
  keyframes, 
  currentVideo,
  videosToUpload
});

export default rootReducer;
