import {
  UPLOAD_VIDEOS_BEGIN,
  UPLOAD_VIDEOS_SUCCESS,
  UPLOAD_VIDEOS_ERROR
} from "../actions/uploadVideoActions";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function videoUploadReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_VIDEOS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        items: action.payload.items
      };

    case UPLOAD_VIDEOS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: []//action.payload.videos
      };

    case UPLOAD_VIDEOS_ERROR:
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

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

/*

//import { cloneDeep } from "lodash";


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
      };

    default:
      return state;
  }
};
*/