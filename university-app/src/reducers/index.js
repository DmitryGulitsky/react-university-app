import { combineReducers } from 'redux';

import { default as changeId } from './changeId';
import { default as changeTable } from './changeTable';

const reducer = combineReducers({
  idNumber: changeId,
  dataUrl: changeTable,
  editTable
});

export default reducer;
