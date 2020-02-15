import axios from "axios";

export const SAVE_KEYFRAMES_BEGIN = "SAVE_KEYFRAMES_BEGIN";
export const SAVE_KEYFRAMES_SUCCESS = "SAVE_KEYFRAMES_SUCCESS";
export const SAVE_KEYFRAMES_ERROR = "SAVE_KEYFRAMES_ERROR";

const URL_SAVE_KEYFRAMES =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload_analysis";

export function saveKeyframes(keyframes, file_name) {
  return dispatch => {
    dispatch(saveKeyframesBegin());
    return uploadKeyframesData(keyframes, file_name)
      .then(json => {
        dispatch(saveKeyframesSuccess(json));
        return json;
      })
      .catch(error => dispatch(saveKeyframesError(error)));
  };
}

async function uploadKeyframesData(keyframes, file_name) {
  //  const response = await axios.put(URL_SAVE_KEYFRAMES, keyframes);
  //  console.log(response);
  try {
    console.log("Saving keyframes data");
    // convert Array back into JSON Object
    let content = Object.fromEntries(keyframes)

    let postdata = {
      file_name: file_name,
      content:  content
    };
    let axiosConfig = {
      /*
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
      */
    };

    axios
      .post(URL_SAVE_KEYFRAMES, postdata, axiosConfig)
      .then(response => {
        console.log("Saved keyframes data ");
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  } catch (e) {
    console.log(e);
  }
}

// Action Creators
export const saveKeyframesBegin = () => ({
  type: SAVE_KEYFRAMES_BEGIN
});

export const saveKeyframesSuccess = keyframes => ({
  type: SAVE_KEYFRAMES_SUCCESS,
  payload: { keyframes }
});

export const saveKeyframesError = error => ({
  type: SAVE_KEYFRAMES_ERROR,
  payload: { error }
});
