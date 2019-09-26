import { combineReducers } from "redux";
import videos from "./videoLibraryReducer";
import keyframes from './keyframesReducer';
import currentVideo from './selectVideoReducer';
import videosToUpload from './videosToUploadReducer'

const rootReducer = combineReducers({
  videos, 
  keyframes, 
  currentVideo,
  videosToUpload
});

export default rootReducer;
