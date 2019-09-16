// TODO: Switch to live fetch once we have a stable API endpoint
/*
function getKeyframes() {
  return fetch("/keyframes")
    .then(handleErrors)
    .then(res => res.json());
}
*/

// TODO: Temporary to test redux is working
function fakeGetKeyframes() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          keyframes: [
            {
              id: 0,
              title: "Keyframe 1",
              timespan: "07:13-07:21",
              description: "age 20-29, white, female, standing"
            },
            {
              id: 1,
              title: "Keyframe 2",
              timespan: "10:46-10:51",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 2,
              title: "Keyframe 3",
              timespan: "27:13-27:21",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 3,
              title: "Keyframe 4",
              timespan: "30:23-30:21",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 4,
              title: "Keyframe 5",
              timespan: "07:13-07:21",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 5,
              title: "Keyframe 6",
              timespan: "07:13-07:21",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 6,
              title: "Keyframe 7",
              timespan: "07:13-07:21",
              description: "age 20-20, white, female, standing"
            },
            {
              id: 7,
              title: "Custom Keyframe 8",
              timespan: "47:13",
              description: "-"
            }
          ]
        }),
      2000
    );
  });
}

export function fetchKeyframes() {
  return dispatch => {
    dispatch(fetchKeyframesBegin());
    return fakeGetKeyframes()
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
/*
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
*/
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