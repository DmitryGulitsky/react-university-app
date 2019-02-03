export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';

export function showPopup() {
  return dispatch => {
    dispatch({
      type: SHOW_POPUP
    });
  };
}

export function hidePopup() {
  return dispatch => {
    dispatch({
      type: HIDE_POPUP
    });
  };
}