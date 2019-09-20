export const FETCH_VIDEOS_BEGIN = "FETCH_VIDEOS_BEGIN";
export const FETCH_VIDEOS_SUCCESS = "FETCH_VIDEOS_SUCCESS";
export const FETCH_VIDEOS_ERROR = "FETCH_VIDEOS_ERROR";

export function getVideos() {
  return dispatch => {
    dispatch(fetchVideosBegin());
    return getVideosJSON()
      .then(json => {
        dispatch(fetchVideosSuccess(json.videos));
        return json.videos;
      })
      .catch(error => dispatch(fetchVideosError(error)));
  };
}

// TODO: Switch to live fetch once we have a stable API endpoint
function getVideosJSON() {
  const url = "/data/videos1.json";
  //  const url = "/data/videos2.json"
  return fetch(url)
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
