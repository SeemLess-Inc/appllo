import { SELECT_VIDEO } from "./../actions/currentVideoAction";

/*
video.
  analytics: "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/get_analytics/ApiTest.mp4.json"
  duration: ""
  id: "ApiTest.mp4"
  src: "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/ApiTest.mp4"
  thumbnail: ""
  title: "ApiTest.mp4"
  uploadedDate: ""
*/

const initialState = {
  id: "",
  title: "",
  duration: "",
  src: "",
  thumbnail: "./video.png",
  uploadedDate: "Unknown date",
  analytics: ""
  //  state: "Uploaded",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_VIDEO:
      //      return { ...state, currentVideo: action.payload.currentVideo }

      return Object.assign({}, state, {
        id: action.payload.currentVideo.id,
        title: action.payload.currentVideo.title,
        duration: action.payload.currentVideo.duration,
        src: action.payload.currentVideo.src,
        thumbnail: action.payload.currentVideo.thumbnail,
        uploadedDate: action.payload.currentVideo.uploadedDate,
        analytics: action.payload.currentVideo.analytics
      });
    default:
      return state;
  }
}
