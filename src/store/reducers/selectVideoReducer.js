import { SELECT_VIDEO } from "./../actions/selectVideoAction";

const initialState = {
  currentVideo: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      return Object.assign({}, state, {
        currentVideo: action.payload.currentVideo
      });
    default:
      return state;
  }
}
