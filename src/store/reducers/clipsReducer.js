import {
  CREATE_CLIP_BEGIN, CREATE_CLIP_ERROR, CREATE_CLIP_SUCCESS,
  FETCH_CLIPS_BEGIN, FETCH_CLIPS_ERROR, FETCH_CLIPS_SUCCESS,
  SELECT_CLIP,
  UPDATE_CLIP_BEGIN, UPDATE_CLIP_ERROR, UPDATE_CLIP_SUCCESS
} from "../actions/clipsActions";

const initialState = {
  createOrUpdateError: null,
  createOrUpdateSuccess: false,
  creatingOrUpdating: false,
  currentClip: {},
  error: null,
  loading: false,
  items: [],
  success: false
};

export default function clipsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CLIP_BEGIN:
    case UPDATE_CLIP_BEGIN:
      return {
        ...state,
        creatingOrUpdating: true,
        createOrUpdateSuccess: false,
        createOrUpdateError: null
      };

    case CREATE_CLIP_ERROR:
    case UPDATE_CLIP_ERROR:
      return {
        ...state,
        creatingOrUpdating: false,
        createOrUpdateError: action.payload.error
      };

    case CREATE_CLIP_SUCCESS:
      return {
        ...state,
        creatingOrUpdating: false,
        createOrUpdateSuccess: true,
        items: [ ...state.items, action.payload.clip ],
        currentClip: action.payload.clip
      };

    case FETCH_CLIPS_BEGIN:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
        currentClip: {}
      };

    case FETCH_CLIPS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case FETCH_CLIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.payload.clips
      };

    case SELECT_CLIP:
      return {
        ...state,
        currentClip: action.payload.clip
      };

    case UPDATE_CLIP_SUCCESS:
      const clip = action.payload.clip;
      return {
        ...state,
        creatingOrUpdating: false,
        createOrUpdateSuccess: true,
        items: state.items.map(item => item.id !== clip.id
          ? item
          : { ...item, ...action.payload.clip }
        ),
        currentClip: clip
      };

    default:
      return state;
  }
}
