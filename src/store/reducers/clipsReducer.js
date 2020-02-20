import {
  CREATE_CLIP_BEGIN,
  CREATE_CLIP_ERROR,
  CREATE_CLIP_SUCCESS,
  SELECT_CLIP,
  UPDATE_CLIP_BEGIN,
  UPDATE_CLIP_ERROR,
  UPDATE_CLIP_SUCCESS
} from "../actions/clipsActions";

const initialState = {
  items: [],
  createOrUpdateError: null,
  createOrUpdateSuccess: false,
  creatingOrUpdating: false,
  currentClip: {}
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
