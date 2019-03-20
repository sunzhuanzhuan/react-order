import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import commonReducers from './common'
import authReducers from '../auth/reducers'
import loginReducer from '../login/reducer/index'
import siderMenuReducer from '../siderMenu/reducers'
import authorizationsReducers from './authorizations'
import trinityReconciliationsReducers from '../trinityReconciliations/reducer';
import exportTemplateReducer from '../components/exportTemplate/reducer';
import statement from '../trinityReconciliations/reducer'
export default combineReducers({
	commonReducers,
	routing: routerReducer,
	auth: authReducers,
	loginReducer,
	siderMenuReducer,
	authorizationsReducers,
  trinityReconciliationsReducers,
  exportTemplateReducer,
  statement
});
