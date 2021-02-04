import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import commonReducers from './common'
import authReducers from '../auth/reducers'
import loginReducer from '../login/reducer/index'
import siderMenuReducer from '../siderMenu/reducers'
import authorizationsReducers from './authorizations'
import trinityReconciliationsReducers from '../trinityReconciliations/reducer';
import statement from '../trinityReconciliations/reducer'
import publicOrderListReducer from '../publicOrderList/reducers'
import closingReportReducers from '../closingReport/reducer'
import spotplanReducers from '../spotplan/reducers'
import business from '../business/reducers'
import taskPoolReducers from '../taskPool/reducers'
import kocReducers from '../kocOrder/reducers'
export default combineReducers({
  commonReducers,
  routing: routerReducer,
  auth: authReducers,
  loginReducer,
  siderMenuReducer,
  authorizationsReducers,
  trinityReconciliationsReducers,
  statement,
  closingReportReducers,
  business,
  spotplanReducers,
  publicOrderListReducer,
  taskPoolReducers,
  kocReducers
});
