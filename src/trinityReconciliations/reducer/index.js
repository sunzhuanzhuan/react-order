import { combineReducers } from 'redux';
import {
  orderList,
  summaryList
} from './statement'

export default combineReducers({
  orderList,
  summaryList
});
