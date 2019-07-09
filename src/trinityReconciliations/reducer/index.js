import { combineReducers } from 'redux';
import {
  orderList,
  summaryTrinityList,
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
  summaryTrinityList,
  detailSummaryList,
  detailSummary,
  statementList,
  token,
  accountName,
  statementInputList,
  agentInfo
});
