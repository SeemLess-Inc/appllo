export const FETCH_KEYFRAMES_BEGIN = "FETCH_KEYFRAMES_BEGIN";
export const FETCH_KEYFRAMES_SUCCESS = "FETCH_KEYFRAMES_SUCCESS";
export const FETCH_KEYFRAMES_ERROR = "FETCH_KEYFRAMES_ERROR";
export const UPDATE_KEYFRAME_USER_APPROVED = "UPDATE_KEYFRAME_USER_APPROVED";

const ENDPOINT_GET =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/get_analytics/";

export function updateKeyframeUserApproved(id, value) {
  return dispatch => {
    dispatch(updateUserApproved(id, value));
    //  return keyframes;
  };
}

export function getKeyframes(video) {
  if (video.analytics === "") {
    return dispatch => {
      const keyframes = [];
      dispatch(fetchKeyframesSuccess(keyframes));
      return keyframes;
    };
  } else {
    return dispatch => {
      dispatch(fetchKeyframesBegin());
      return getKeyframesJSON(video.id)
        .then(json => {
          const keyframes = parseKeyframesJSON(json);
          dispatch(fetchKeyframesSuccess(keyframes));
          return keyframes;
        })
        .catch(error => dispatch(fetchKeyframesError(error)));
    };
  }
}

function parseKeyframesJSON(json) {
  let keyframesJSON = json.body;

  // trim first 2 entries
  delete keyframesJSON.callback_url;
  delete keyframesJSON.video_url;

  // Convert Object to an Array
  let o1 = Object.entries(keyframesJSON);

  let o2 = o1.map(function(item) {
    // add userApproved boolean to metadata if it does not exist
    if (item[1].userApproved === undefined) {
      item[1].userApproved = true;
    }
    return item;
  });
  return o2;
}

function getKeyframesJSON(videoID) {
  const url = ENDPOINT_GET + videoID;
  //  const url = "/data/netra.json";
  return fetch(url, {
    method: "GET",
    mode: "cors"
  })
    .then(handleErrors)
    .then(res => res.json());
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const updateUserApproved = (id, value) => ({
  type: UPDATE_KEYFRAME_USER_APPROVED,
  payload: { id, value }

});

export const fetchKeyframesBegin = () => ({
  type: FETCH_KEYFRAMES_BEGIN
});

export const fetchKeyframesSuccess = keyframes => ({
  type: FETCH_KEYFRAMES_SUCCESS,
  payload: { keyframes }
});

export const fetchKeyframesError = error => ({
  type: FETCH_KEYFRAMES_ERROR,
  payload: { error }
});
