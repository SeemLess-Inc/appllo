import {
  UPLOAD_VIDEO
} from "../actions/uploadVideoAction";


const initialState = {
  videosToUpload: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO:
      // TODO: Upload the video using Tom's API
      return { 
        ...state, 
        videosToUpload: action.payload.files 
      }
    default:
      return state;
  }
};
