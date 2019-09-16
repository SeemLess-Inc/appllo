// TODO: Switch to live fetch once we have a stable API endpoint

function getKeyframes() {
//  return fetch("/netra.json")
  return fetch("/data/keyframes.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchKeyframes() {
  return dispatch => {
    dispatch(fetchKeyframesBegin());
    return getKeyframes()
      .then(json => {
        dispatch(fetchKeyframesSuccess(json.keyframes));
        return json.keyframes;
      })
      .catch(error =>
        dispatch(fetchKeyframesError(error))
      );
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_KEYFRAMES_BEGIN   = 'FETCH_KEYFRAMES_BEGIN';
export const FETCH_KEYFRAMES_SUCCESS = 'FETCH_KEYFRAMES_SUCCESS';
export const FETCH_KEYFRAMES_ERROR = 'FETCH_KEYFRAMES_ERROR';

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