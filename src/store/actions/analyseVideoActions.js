import axios from "axios";

export const ANALYSE_VIDEO_BEGIN = "ANALYSE_VIDEO_BEGIN";
export const ANALYSE_VIDEO_SUCCESS = "ANALYSE_VIDEO_SUCCESS";
export const ANALYSE_VIDEO_ERROR = "ANALYSE_VIDEO_ERROR";

const URL_ANALYSE = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/analyse";

export function analyseVideo(video) {
  return dispatch => {
    dispatch(analyseVideoBegin(video));
    return analyseVideoAtNetra(video)
      .then(json => {
        dispatch(analyseVideoSuccess(json));
        return json;
      })
      .catch(error => dispatch(analyseVideoError(error)));
  };
}

async function analyseVideoAtNetra(video) {
  const postdata = {
    file_name: video.id
  };
  const axiosConfig = {};
  try {
    axios
      .post(URL_ANALYSE, postdata, axiosConfig)
      .then(response => {
        console.log("Analysed " + video.id + " to " + URL_ANALYSE);
      })
      .catch(error => {
//        alert(JSON.stringify(error));
      });
  } catch (e) {
    console.log(e);
  }
}

// Action Creators
export const analyseVideoBegin = video => ({
  type: ANALYSE_VIDEO_BEGIN,
  payload: { video }
});

export const analyseVideoSuccess = () => ({
  type: ANALYSE_VIDEO_SUCCESS,
  payload: {}
});

export const analyseVideoError = error => ({
  type: ANALYSE_VIDEO_ERROR,
  payload: { error }
});
