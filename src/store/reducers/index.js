import { combineReducers } from "redux";
import videos from "./videosReducer";

const rootReducer = combineReducers({
  videos
});

export default rootReducer;
