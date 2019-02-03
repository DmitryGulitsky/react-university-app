export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export function showLoader() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
  };
}

export function hideLoader() {
  return dispatch => {
    dispatch({
      type: HIDE_LOADER
    });
  };
}