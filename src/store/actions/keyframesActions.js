export const FETCH_KEYFRAMES_BEGIN = "FETCH_KEYFRAMES_BEGIN";
export const FETCH_KEYFRAMES_SUCCESS = "FETCH_KEYFRAMES_SUCCESS";
export const FETCH_KEYFRAMES_ERROR = "FETCH_KEYFRAMES_ERROR";

// const ENDPOINT = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/get_analytics/";

export function getKeyframes() {
  return dispatch => {
    dispatch(fetchKeyframesBegin());
    return getKeyframesJSON()
      .then(json => {
        const keyframes = parseKeyframesJSON(json);
        dispatch(fetchKeyframesSuccess(keyframes));
        return keyframes;
      })
      .catch(error => dispatch(fetchKeyframesError(error)));
  };
}

function parseKeyframesJSON(json) {
  // Convert Object to an Array
  return Object.entries(json);
}

// TODO: Switch to live fetch once we have a stable API endpoint
function getKeyframesJSON() {
//  const filename = "ApiTest.mp4";
//  const url = ENDPOINT + filename;
  const url = "/data/netra.json";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "no-cors",
    cache: 'default'
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