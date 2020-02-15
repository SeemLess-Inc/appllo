import axios from "axios";

export const UPLOAD_VIDEOS_BEGIN = "UPLOAD_VIDEOS_BEGIN";
export const UPLOAD_VIDEOS_SUCCESS = "UPLOAD_VIDEOS_SUCCESS";
export const UPLOAD_VIDEOS_ERROR = "UPLOAD_VIDEOS_ERROR";

const URL_GET_UPLOAD_URL =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload_get_url";
//const URL_UPLOAD = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload";


function uploadFile(dispatch, url, type, data) {
  uploadFileToS3(url, type, data)
    .then(response => {
      // response.body is a readable stream. Calling getReader() gives us exclusive access to the stream's content
      var reader = response.body.getReader();
      var bytesSent = 0;

      // read() returns a promise that resolves when a value has been received
      return reader.read().then(function processResult(result) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (result.done) {
          console.log("Fetch complete");
          dispatch(uploadVideosSuccess(response));
          return;
        }

        // result.value for fetch streams is a Uint8Array
        bytesSent += result.value.length;
        console.log("Sent", bytesSent, "bytes of data so far");

        // Read some more, and call this function again
        return reader.read().then(processResult);
      });
    })
    .catch(error => dispatch(uploadVideosError(error)));
}

export function uploadVideos(videoFile, thumbFile) {
  return dispatch => {
    dispatch(uploadVideosBegin(videoFile));

    getVideoUploadURLs(videoFile, thumbFile)
      .then(response => {
        const uploadURLs = response;
        uploadFile(dispatch, uploadURLs[0], "video/mp4", videoFile);
        uploadFile(dispatch, uploadURLs[1], "image/png", thumbFile);
      })
      .catch(error => {});
  };
}

// https://blog.shovonhasan.com/using-promises-with-filereader/
// https://codesandbox.io/s/lrjxj8w867
async function getVideoUploadURLs(videoFile, thumbFile) {
  var params = { files: [ videoFile.name, thumbFile.name ] };
  const res = await axios.post(URL_GET_UPLOAD_URL, params);
  return res.data.upload_urls;
}

async function uploadFileToS3(url, type, file) {
  const config = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": type
    }),
    body: file
  };

  return fetch(url, config);
}

// Action Creators
export const uploadVideosBegin = items => ({
  type: UPLOAD_VIDEOS_BEGIN,
  payload: { items }
});

export const uploadVideosSuccess = response => ({
  type: UPLOAD_VIDEOS_SUCCESS,
  payload: { response }
});

export const uploadVideosError = error => ({
  type: UPLOAD_VIDEOS_ERROR,
  payload: { error }
});
