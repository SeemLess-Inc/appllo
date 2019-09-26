import { SELECT_VIDEO } from "./../actions/currentVideoAction";

const initialState = {
  id: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      return Object.assign({}, state, {
        id: action.payload.currentVideo
      });
    default:
      return state;
  }
}
