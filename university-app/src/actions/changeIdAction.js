export const CHANGE_ID = 'CHANGE_ID';

export function changeIdAction(idNumber) {
  return {
    type: CHANGE_ID,
    idNumber
  }
}