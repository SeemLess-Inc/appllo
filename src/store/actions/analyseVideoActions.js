import axios from "axios";

export const ANALYSE_VIDEO_BEGIN = "ANALYSE_VIDEO_BEGIN";
export const ANALYSE_VIDEO_SUCCESS = "ANALYSE_VIDEO_SUCCESS";
export const ANALYSE_VIDEO_ERROR = "ANALYSE_VIDEO_ERROR";

//const URL_S3 = "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/";
//const URL_UPLOAD = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload";
const URL_ANALYSE =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/analyse";

/*
  From Tom: Basically you'll have endpoints to:
 1. POST upload the video (this will currently also process it and reply with the Netra JSON all in one call if that makes it easier for you)
 2. GET the Netra JSON for that video
*/

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
    file_name: video.src
  };
  const axiosConfig = {};
  try {
    axios
      .post(URL_ANALYSE, postdata, axiosConfig)
      .then(response => {
        console.log("Analysed " + video.id + " to " + URL_ANALYSE);
        //        debugger;
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
