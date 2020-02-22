export const CREATE_CLIP_BEGIN = "CREATE_CLIP_BEGIN";
export const CREATE_CLIP_ERROR = "CREATE_CLIP_ERROR";
export const CREATE_CLIP_SUCCESS = "CREATE_CLIP_SUCCESS";
export const SELECT_CLIP = "SELECT_CLIP";
export const FETCH_CLIPS_BEGIN = "FETCH_CLIPS_BEGIN";
export const FETCH_CLIPS_ERROR = "FETCH_CLIPS_ERROR";
export const FETCH_CLIPS_SUCCESS = "FETCH_CLIPS_SUCCESS";
export const UPDATE_CLIP_BEGIN = "UPDATE_CLIP_BEGIN";
export const UPDATE_CLIP_ERROR = "UPDATE_CLIP_ERROR";
export const UPDATE_CLIP_SUCCESS = "UPDATE_CLIP_SUCCESS";

const postClip = (clip, clips) => new Promise((resolve, reject) => {
  setTimeout( () => {
    if(clips.find(({identiryName}) => identiryName === clip.identiryName)) {
      reject({
        status: 409,
        error:'Clip already exists. Change the clip name.'
      })
    } else {
      resolve({
        status: 200,
        data:{
          id: Math.floor(Math.random()*1000),
          ...clip
        }
      })
    }
  }, 250)
});

const putClip = clip => new Promise((resolve) => {
  setTimeout( () => {
    resolve({
      status: 200,
      data: clip
    })
  }, 250)
});

const getClips = video => new Promise((resolve) => {
  setTimeout( () => {
    resolve({status: 200, data:[]})
  }, 550)
});

export const createClip = (clip, clips) => dispatch => {
  dispatch(createClipBegin());
  if(!clip.identiryName && clip.identiryName !== 0) {
    clip.identiryName = `${clip.duration.toFixed(2)} sec (${clip.startOffset ? clip.startOffset.toFixed(2) : 0} - ${(clip.startOffset + clip.duration).toFixed(2)})`
  }
  return postClip(clip, clips)
    .then(({data}) => {
      dispatch(createClipSuccess(data));
      return data;
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

export const fetchClips = (video) => dispatch => {
  dispatch(fetchClipsBegin());
  return getClips(video)
    .then(({data}) => {
      dispatch(fetchClipsSuccess(data));
      return data;
    })
    .catch(error => dispatch(fetchClipsError(error)));
};

export const fetchClipsBegin = () => ({
  type: FETCH_CLIPS_BEGIN
});

export const fetchClipsError = error => ({
  type: FETCH_CLIPS_ERROR,
  payload: { error }
});

export const fetchClipsSuccess = clips => ({
  type: FETCH_CLIPS_SUCCESS,
  payload: { clips }
});

export const selectClip = clip => ({
  type: SELECT_CLIP,
  payload: { clip }
});

export const updateClip = clip => dispatch => {
  dispatch(updateClipBegin());
  return putClip(clip)
    .then(({data}) => {
      dispatch(updateClipSuccess(data));
      return data;
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
