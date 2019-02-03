export const DATA_TO_UPDATE = 'DATA_TO_UPDATE';

export const dataToUpdate = (dataToUpdate) => {
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: DATA_TO_UPDATE,
      dataToUpdate
    });
  };
};