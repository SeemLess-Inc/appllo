export const CREATE_CLIP_BEGIN = "CREATE_CLIP_BEGIN";
export const CREATE_CLIP_ERROR = "CREATE_CLIP_ERROR";
export const CREATE_CLIP_SUCCESS = "CREATE_CLIP_SUCCESS";
export const SELECT_CLIP = "SELECT_CLIP";
export const UPDATE_CLIP_BEGIN = "UPDATE_CLIP_BEGIN";
export const UPDATE_CLIP_ERROR = "UPDATE_CLIP_ERROR";
export const UPDATE_CLIP_SUCCESS = "UPDATE_CLIP_SUCCESS";

const postClip = (clip, clips) => new Promise((resolve, reject) => {
  setTimeout( () => {
    if(clips.find(({name}) => name === clip.name)) {
      reject({
        status: 409,
        error:'Clip already exists. Change the clip name.'
      })
    } else {
      resolve({
        id: Math.floor(Math.random()*1000),
        ...clip
      })
    }
  }, 250)
});

const putClip = clip => new Promise((resolve) => {
  setTimeout( () => {
    resolve(clip)
  }, 250)
});

export const createClip = (clip, clips) => dispatch => {
  dispatch(createClipBegin());
  return postClip(clip, clips)
    .then(response => {
      dispatch(createClipSuccess(response));
      return response;
    })
    .catch(error => dispatch(createClipError(error)));
};

export const createClipBegin = () => ({
  type: CREATE_CLIP_BEGIN
});

export const createClipError = error => ({
  type: CREATE_CLIP_ERROR,
  payload: { error }
});

export const createClipSuccess = clip => ({
  type: CREATE_CLIP_SUCCESS,
  payload: { clip }
});

export const selectClip = clip => ({
  type: SELECT_CLIP,
  payload: { clip }
});

export const updateClip = clip => dispatch => {
  dispatch(updateClipBegin());
  return putClip(clip)
    .then(response => {
      dispatch(updateClipSuccess(response));
      return response;
    })
    .catch(error => dispatch(updateClipError(error)));
};

export const updateClipBegin = () => ({
  type: UPDATE_CLIP_BEGIN
});

export const updateClipError = error => ({
  type: UPDATE_CLIP_ERROR,
  payload: { error }
});

export const updateClipSuccess = clip => ({
  type: UPDATE_CLIP_SUCCESS,
  payload: { clip }
});
