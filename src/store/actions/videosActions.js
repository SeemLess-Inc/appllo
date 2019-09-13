// TODO: Switch to live fetch once we have a stable API endpoint
function getVideos() {
  return fetch("/videos")
    .then(handleErrors)
    .then(res => res.json());
}

// TODO: Temporary to test redux is working
function fakeGetVideos() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          videos: [
            {
              id: 0,
              title: "Big Little Lies - Apple iMac",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "55:12"
            },
            {
              id: 1,
              title: "13 Reasons Why - VW",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "53:25"
            },
            {
              id: 2,
              title: "Comedians in Cars - BMW",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "43:17"
            },
            {
              id: 3,
              title: "Stranger Things - Coke",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "56:32"
            },
            {
              id: 4,
              title: "Black Mirror - PGTips",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "56:36"
            },
            {
              id: 5,
              title: "Comedians in Cars - BMW",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "47:18"
            },
            {
              id: 6,
              title: "True Detective - Bud Light",
              thumbnail: './video.png',
              uploadedDate: "May 6, 2019",
              duration: "56:34"
            }
          ]
        }),
      2000
    );
  });
}

export function fetchVideos() {
  return dispatch => {
    dispatch(fetchVideosBegin());
    return fakeGetVideos()
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