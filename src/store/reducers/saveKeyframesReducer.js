import {
  MARK_KEYFRAMES_DIRTY,
  SAVE_KEYFRAMES_BEGIN,
  SAVE_KEYFRAMES_SUCCESS,
  SAVE_KEYFRAMES_ERROR
} from "../actions/saveKeyframesActions";

const initialState = {
  items: [],
  loading: false,
  dirty: false,
  success: null,
  error: null
};

export default function saveKeyframesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_KEYFRAMES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        success: null,
        error: null
      };

    case SAVE_KEYFRAMES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        success: true,
        dirty: false,
//        items: []//action.payload.keyframesData
      };

    case SAVE_KEYFRAMES_ERROR:
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
        success: false,
        error: action.payload.error,
//        items: []
      };

      case MARK_KEYFRAMES_DIRTY:
      return {
        ...state,
        success: null,
        dirty: action.payload.dirty
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
