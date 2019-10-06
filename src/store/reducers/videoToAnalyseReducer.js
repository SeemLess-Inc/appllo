import {
  ANALYSE_VIDEO_BEGIN,
  ANALYSE_VIDEO_SUCCESS,
  ANALYSE_VIDEO_ERROR
} from "../actions/analyseVideoActions";

const initialState = {
  video: null,
  loading: false,
  error: null
};

export default function analyseVideoReducer(state = initialState, action) {
  switch (action.type) {
    case ANALYSE_VIDEO_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        video: action.payload.video
      };

    case ANALYSE_VIDEO_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        video: null
      };

    case ANALYSE_VIDEO_ERROR:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        video: null
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
