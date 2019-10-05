import axios from "axios";

export const UPLOAD_VIDEOS_BEGIN = "UPLOAD_VIDEOS_BEGIN";
export const UPLOAD_VIDEOS_SUCCESS = "UPLOAD_VIDEOS_SUCCESS";
export const UPLOAD_VIDEOS_ERROR = "UPLOAD_VIDEOS_ERROR";

//const URL_S3 = "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/";
const URL_UPLOAD =
  "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload";
// const URL_ANALYSE = "https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/analyse";

/*
  From Tom: Basically you'll have endpoints to:
 1. POST upload the video (this will currently also process it and reply with the Netra JSON all in one call if that makes it easier for you)
 2. GET the Netra JSON for that video
*/

export function uploadVideos(fileList) {
  return dispatch => {
    dispatch(uploadVideosBegin(fileList));
    return uploadVideosToS3(fileList)
      .then(json => {
        dispatch(uploadVideosSuccess(json));
        return json;
      })
      .catch(error => dispatch(uploadVideosError(error)));
  };
}

function readUploadedFileAsText(inputFile) {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    //    temporaryFileReader.readAsText(inputFile);
    temporaryFileReader.readAsDataURL(inputFile);
  });
}

// https://blog.shovonhasan.com/using-promises-with-filereader/
// https://codesandbox.io/s/lrjxj8w867
async function uploadVideosToS3(fileList) {
  const file = fileList[0];
  const file_name = file.name;

  try {
    const fileContents = await readUploadedFileAsText(file);
    console.log("Uploading " + file_name + " to " + URL_UPLOAD);

    // curl -X POST https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/prod/upload -d '{ "file_name": "test.mp4", "content": "c2FtcGxlIHRleHQ=" }'
    let postdata = {
      file_name: file_name,
      content: fileContents
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
      .post(URL_UPLOAD, postdata, axiosConfig)
      .then(response => {
        console.log("Uploaded " + file_name + " to " + URL_UPLOAD);
        //        debugger;
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  } catch (e) {
    console.log(e);
  }
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
