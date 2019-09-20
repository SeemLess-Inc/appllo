import axios from "axios";

export const UPLOAD_VIDEOS_BEGIN = "UPLOAD_VIDEOS_BEGIN";
export const UPLOAD_VIDEOS_SUCCESS = "UPLOAD_VIDEOS_SUCCESS";
export const UPLOAD_VIDEOS_ERROR = "UPLOAD_VIDEOS_ERROR";

const URL_S3 = "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/";
const URL_UPLOAD ="";
const URL_PROCESS ="https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/Production/";
const URL_VIDEO = URL_S3 + "Three+Active+Happy+Adult+Girlfriends+Stock+Footage+Video.mp4";


/*
  From Tom: Basically you'll have endpoints to:
 1. POST upload the video (this will currently also process it and reply with the Netra JSON all in one call if that makes it easier for you)
 2. GET the Netra JSON for that video
*/

export function uploadVideos(files) {
  return dispatch => {
    dispatch(uploadVideosBegin(files));
    return uploadVideosToS3(files)
      .then(json => {
        dispatch(uploadVideosSuccess(json));
        return json;
      })
      .catch(error => dispatch(uploadVideosError(error)));
  };
}

function uploadVideosToS3(files) {
  let file = files[0];

  // Split the filename to get the name and type
  let fileParts = files[0].name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];

  console.log("Preparing the upload");

//  debugger;

  // FAKE API RESPONSE
  const url = "/data/netra.json";
  return fetch(url)
    .then(handleErrors)
    .then(res => res.json());

/*
// LIVE API CALL based on https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689

  axios
    .post( URL_UPLOAD, {
      fileName: fileName,
      fileType: fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({ url: url });
      console.log("Recieved a signed request " + signedRequest);

      var options = {
        headers: {
          "Content-Type": fileType
        }
      };
      axios
        .put(signedRequest, file, options)
        .then(result => {
          console.log("Response from s3");
          this.setState({ success: true });
        })
        .catch(error => {
          alert("ERROR " + JSON.stringify(error));
        });

    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
*/
}

function processVideoInS3() {
  /*
  curl -X POST https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/Production/ 
  -d '{ "video_url": "http://elasticbeanstalk-eu-west-1-060643667111.s3-eu-west-1.amazonaws.com/Three+Active+Happy+Adult+Girlfriends+Stock+Footage+Video.mp4" }'

  Currently https://ujxx6kt1f2.execute-api.eu-west-1.amazonaws.com/Production/ is the URL to upload and process a video
  The video_url parameter is for an uploaded video in our S3 bucket.
  */
  /*
   */
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const uploadVideosBegin = files => ({
  type: UPLOAD_VIDEOS_BEGIN,
  payload: { files }
});

export const uploadVideosSuccess = keyframes => ({
  type: UPLOAD_VIDEOS_SUCCESS,
  payload: { keyframes }
});

export const uploadVideosError = error => ({
  type: UPLOAD_VIDEOS_ERROR,
  payload: { error }
});
