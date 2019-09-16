// TODO: Switch to live fetch once we have a stable API endpoint

function getVideos() {
  return fetch("/data/videos1.json")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchVideos() {
  return dispatch => {
    dispatch(fetchVideosBegin());
    return getVideos()
      .then(json => {
        dispatch(fetchVideosSuccess(json.videos));
        return json.videos;
      })
      .catch(error =>
        dispatch(fetchVideosError(error))
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

export const FETCH_VIDEOS_BEGIN   = 'FETCH_VIDEOS_BEGIN';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_ERROR = 'FETCH_VIDEOS_ERROR';

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