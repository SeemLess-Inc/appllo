import {
  SAVE_KEYFRAMES_BEGIN,
  SAVE_KEYFRAMES_SUCCESS,
  SAVE_KEYFRAMES_ERROR
} from "../actions/saveKeyframesActions";

const initialState = {
  items: [],
  loading: false,
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
        error: null,
        items: action.payload.items
      };

    case SAVE_KEYFRAMES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
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
        error: action.payload.error,
//        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
