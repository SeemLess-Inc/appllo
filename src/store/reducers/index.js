import { combineReducers } from "redux";
import videos from "./videosReducer";
import keyframes from './keyframesReducer'

const rootReducer = combineReducers({
  videos, keyframes
});

export default rootReducer;
