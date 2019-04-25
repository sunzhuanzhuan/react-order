import { combineReducers } from 'redux';
import {
  orderList,
  summaryList,
  detailSummaryList,
  detailSummary,
  statementList,
  token,
  accountName,
  statementInputList,
  agentInfo
} from './statement'

export default combineReducers({
  orderList,
  summaryList,
  detailSummaryList,
  detailSummary,
  statementList,
  token,
  accountName,
  statementInputList,
  agentInfo
});
