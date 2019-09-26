import { SELECT_VIDEO } from "./../actions/currentVideoAction";

const initialState = {
  id: "",
  title: "",
  thumbnail: "./video.png",
  uploadedDate: "Unknown date",
  state: "Uploaded",
  analysis: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      return Object.assign({}, state, {
        id: action.payload.currentVideo,
        title: action.payload.currentVideo
      });
    default:
      return state;
  }
}
