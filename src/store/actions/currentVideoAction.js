export const SELECT_VIDEO = "SELECT_VIDEO";
export const SET_PLAYER = "SET_PLAYER";
export const SET_CLIP = "SET_CLIP";

export const selectVideo = (currentVideo) => ({
  type: SELECT_VIDEO,
  payload: { currentVideo }
});

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  payload: { player }
});

export const setClip = (clip) => ({
  type: SET_CLIP,
  payload: { clip }
});
