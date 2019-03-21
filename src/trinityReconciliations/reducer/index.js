import { combineReducers } from 'redux';
import {
  orderList,
  summaryList,
  detailSummaryList,
  detailSummary,
  statementList
} from './statement'

export default combineReducers({
  orderList,
  summaryList,
  detailSummaryList,
  detailSummary,
  statementList
});
