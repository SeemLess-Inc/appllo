import {
  FETCH_KEYFRAMES_BEGIN,
  FETCH_KEYFRAMES_SUCCESS,
  FETCH_KEYFRAMES_ERROR,
  UPDATE_KEYFRAME_USER_APPROVED,
  SELECT_KEYFRAME,
  SEEK_TO_KEYFRAME
} from "../actions/keyframesActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentKeyframe: [null, {}],
  seekToKeyframe: null
};

export default function keyframesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_KEYFRAMES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_KEYFRAMES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.keyframes
      };

    case FETCH_KEYFRAMES_ERROR:
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
        items: []
      };

    case UPDATE_KEYFRAME_USER_APPROVED:
      let currentKeyframe = state.currentKeyframe;
      let newItems = state.items.map(function(vo) {
        // set the value of userApproved in the Keyframes array
        if (vo[0] === action.payload.id) {
          vo[1].userApproved = action.payload.value;
          if (currentKeyframe[0] === vo[0]) {
            currentKeyframe[1].userApproved = action.payload.value;
          }
        }
        return vo;
      });
      return {
        ...state,
        currentKeyframe,
        loading: false,
        items: newItems
      };

    case SELECT_KEYFRAME:
      if (Array.isArray(action.payload.currentKeyframe)) {
        return {
          ...state,
          currentKeyframe: action.payload.currentKeyframe,
          seekToKeyframe: parseFloat(action.payload.currentKeyframe[1].frame_time)
        };
      }
      return { ...state, currentKeyframe: [null, {}], seekToKeyframe: null };

    case SEEK_TO_KEYFRAME:
        return { ...state, seekToKeyframe: action.payload.seconds };



    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
