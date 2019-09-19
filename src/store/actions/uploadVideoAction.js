export const UPLOAD_VIDEO = "UPLOAD_VIDEO"

export const uploadVideoAction = files => ({
  type: UPLOAD_VIDEO,
  payload: files
});
