import { combineReducers } from "redux";
import videos from "./videoLibraryReducer";
import keyframes from './keyframesReducer'
import videosToUpload from './videosToUploadReducer'

const rootReducer = combineReducers({
  videos, keyframes, videosToUpload
});

export default rootReducer;
