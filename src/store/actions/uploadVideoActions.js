import axios from "axios";

export const UPLOAD_VIDEOS_BEGIN = "UPLOAD_VIDEOS_BEGIN";
export const UPLOAD_VIDEOS_SUCCESS = "UPLOAD_VIDEOS_SUCCESS";
export const UPLOAD_VIDEOS_ERROR = "UPLOAD_VIDEOS_ERROR";

const URL_GET_UPLOAD_URL =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload_get_url";
//const URL_UPLOAD = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload";

export function uploadVideos(fileList) {
  return dispatch => {
    dispatch(uploadVideosBegin(fileList));

    uploadVideosToS3(fileList)
      .then(response => {
        // response.body is a readable stream. Calling getReader() gives us exclusive access to the stream's content
        var reader = response.body.getReader();
        var bytesSent = 0;

        // read() returns a promise that resolves when a value has been received
        return reader.read().then(function processResult(result) {
          // Result objects contain two properties:
          // done  - true if the stream has already given you all its data.
          // value - some data. Always undefined when done is true.
          console.log('result: ' + JSON.stringify(result))
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
  };
}

// https://blog.shovonhasan.com/using-promises-with-filereader/
// https://codesandbox.io/s/lrjxj8w867
async function uploadVideosToS3(fileList) {
  /* const file = fileList[0];
  const file_name = file.name; */

  const file = fileList;
  //alert(JSON.stringify(file[1]))
  const reverseFile = file.reverse();
  console.log('reverse array: ' + JSON.stringify(reverseFile))
  const thumbnail_filename = file[0].name;
  const video_filename = file[1].name;

  // async get an S3 upload URL from
  // curl -X POST https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload_get_url

  //var params = { file_name: file_name };
  var params = {files:[video_filename,thumbnail_filename]}
  //var params = { video_filename: video_filename,thumbnail_filename:thumbnail_filename };
  console.log('params: ' + JSON.stringify(params))
  const res = await axios.post(URL_GET_UPLOAD_URL, params);
  console.log('api response: ' + JSON.stringify(res))
  // Taking the URL and using it directly works e.g.
  // curl -X PUT -T "testfile.txt" "https://elasticbeanstalk-eu-west-1-060643667111.s3.amazonaws.com/Three%20Active%20Happy%20Adult%20Girlfriends%20Stock%20Footage%20Video.mp4?AWSAccessKeyId=ASIAQ4HVE5ST7UH5BWMW&Signature=OSaFluNgmk6S0jdtwadhqDynJQA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIDQIBKONJXNkSSyEkbDOLpBG2M5h6RXC%2BBzczIGEx5iJAiEA4F11pmzfJ7OamLP25TPQ2AhRSwhHsOwWdNgyyD%2BCHMkq0AEIGxAAGgwwNjA2NDM2NjcxMTEiDNmGwBJhYEi%2B7BmUOSqtAe0UDylwim%2BOCASSrSj%2BOlLsic4ZbXp6gFovhOHLMM8XqW3T6bBgk0Lo6FpPonkIZBTedIicGiepDC3V9XeUMvle2LR2H4nbr%2FW2VOtsmn87Arl%2B4qVws7QIe2XjbFYBCad2SHe5F%2BQpgFK5vZ%2F3GXk60jz1HaSNR4fmZ34h9GFEUquLMCYkYTdZlBwFb15s1xiJvtiholsswW75TB727757OLjJwcMWcX1cIzYrMLXcq%2B4FOuABF%2FSoVADVy3LZ8EEIxhC8OL4OX1vBaFDXv5urLhr%2F5neQTDFPlg6O8CafT9q8UfO2lROh3zBCuYdhMP%2Fq%2BlU9VpM5HQw5r7KyAn0OOjQemirjnhp2dBZD44fbRFcOnuVSuKCqYBOV4GSxmKKH37T5KtNjejNJ3T9Dq1WgHLIo%2BFKjEfYJ2tD%2Frp9zv1h0Sp8iX70xDkHFgsql8mrMmwU1z%2BOfiJdYewxTJ02mzSNSfys%2F%2FIgs4AVbKjMEv03w9r5iF%2BDtAZR%2F7KSComg3GWg9usZAyIrOCGWVvPGvDx1%2FFUw%3D&Expires=1573585021"

  const config = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "video/mp4"
    }),
    body: file[1]
  };

  console.log('upload urls: ' + JSON.stringify(res.data.upload_urls));
  return fetch(res.data.upload_urls[1], config);
}

// Action Creators
export const uploadVideosBegin = items => ({
  type: UPLOAD_VIDEOS_BEGIN,
  payload: { items }
});

export const uploadVideosSuccess = fileList => ({
  type: UPLOAD_VIDEOS_SUCCESS,
  payload: { fileList }
});

export const uploadVideosError = error => ({
  type: UPLOAD_VIDEOS_ERROR,
  payload: { error }
});
