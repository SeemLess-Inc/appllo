export const FETCH_VIDEOS_BEGIN = "FETCH_VIDEOS_BEGIN";
export const FETCH_VIDEOS_SUCCESS = "FETCH_VIDEOS_SUCCESS";
export const FETCH_VIDEOS_ERROR = "FETCH_VIDEOS_ERROR";

const ENDPOINT = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/list";

/*
async function go() {
  try {
    const response = await fetch(ENDPOINT, {
      method: "GET",
      mode: "cors"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }
    const json = await response.json();
    debugger
    return json;
  } catch (error) {
    console.log(
      "There has been a problem with your fetch operation: ",
      error.message
    );
  }
}
*/

export function listVideos() {
  return dispatch => {
    dispatch(fetchVideosBegin());
    return getVideosJSON()
      .then(json => {
        let body = JSON.parse(json.body);
        dispatch(fetchVideosSuccess(body));
        return body;
      })
      .catch(error => dispatch(fetchVideosError(error)));
  };
}

function getVideosJSON() {
   const url = ENDPOINT;
   // const url = "/data/list.json";
  // const url = "/data/videos1.json";
  return fetch(url, {
    method: "GET",
    mode: "cors"
  })
    .then(handleErrors)
    .then(res => res.json());
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (response.ok) {
    return response;
  } else {
    throw Error(`Request rejected with status ${response.status}`);
  }
}

// Action Creators
export const fetchVideosBegin = () => ({
  type: FETCH_VIDEOS_BEGIN
});
export const fetchVideosSuccess = videos => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: { videos }
});
export const fetchVideosError = error => ({
  type: FETCH_VIDEOS_ERROR,
  payload: { error }
});
