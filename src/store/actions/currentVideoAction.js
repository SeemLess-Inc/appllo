export const SELECT_VIDEO = "SELECT_VIDEO";

export const selectVideo = (currentVideo) => ({
  type: SELECT_VIDEO,
  payload: { currentVideo }
});
